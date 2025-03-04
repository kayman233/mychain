package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

// PRIME is the 12th Mersenne Prime (2^127 - 1)
// A Mersenne prime is a prime number that is one less than a power of two.
// Using a large prime number for modulo operations ensures the security of the scheme.
var PRIME *big.Int

// Initialize the PRIME variable during package initialization.
func init() {
	// Calculate PRIME = 2^127 - 1
	PRIME = new(big.Int).Sub(new(big.Int).Lsh(big.NewInt(1), 127), big.NewInt(1))
}

// randomInt generates a cryptographically secure random integer in [0, max).
// It uses crypto/rand for secure random number generation.
func randomInt(max *big.Int) *big.Int {
	n, err := rand.Int(rand.Reader, max)
	if err != nil {
		// If there's an error in random number generation, panic.
		panic(err)
	}
	return n
}

// evalAt evaluates a polynomial at a given x value modulo prime.
// The polynomial is represented as a slice of coefficients (poly),
// where poly[0] is the constant term, and poly[n] is the coefficient for x^n.
func evalAt(poly []*big.Int, x, prime *big.Int) *big.Int {
	accum := big.NewInt(0) // Initialize accumulator to 0
	// Evaluate the polynomial using Horner's method for efficiency.
	// Start from the highest degree term and work backwards.
	for i := len(poly) - 1; i >= 0; i-- {
		accum.Mul(accum, x)       // accum = accum * x
		accum.Add(accum, poly[i]) // accum = accum + poly[i]
		accum.Mod(accum, prime)   // accum = accum % prime
	}
	// Return a copy of the accumulator to avoid unintended modifications.
	return new(big.Int).Set(accum)
}

// makeRandomShares generates random shares for a given secret.
// It creates a random polynomial of degree (minimum - 1) where the constant term is the secret.
// The function returns a slice of share points (x, y).
func makeRandomShares(secret *big.Int, minimum, shares int, prime *big.Int) [][2]*big.Int {
	if minimum > shares {
		// If the minimum required shares is greater than the total shares,
		// the secret cannot be recovered. Panic in this case.
		panic("Pool secret would be irrecoverable.")
	}
	// Generate random polynomial coefficients.
	// The first coefficient is the secret.
	poly := make([]*big.Int, minimum)
	poly[0] = new(big.Int).Set(secret)
	// Generate random coefficients for the remaining terms.
	for i := 1; i < minimum; i++ {
		poly[i] = randomInt(prime)
	}
	// Generate share points by evaluating the polynomial at different x values.
	points := make([][2]*big.Int, shares)
	for i := 1; i <= shares; i++ {
		x := big.NewInt(int64(i))   // x coordinate
		y := evalAt(poly, x, prime) // y = f(x) mod prime
		// Store the share as a tuple (x, y).
		points[i-1] = [2]*big.Int{new(big.Int).Set(x), y}
	}
	return points
}

// divmod computes num / den modulo p.
// It calculates the modular inverse of den modulo p and multiplies it by num.
func divmod(num, den, p *big.Int) *big.Int {
	// Calculate the modular inverse of den modulo p.
	inv := new(big.Int).ModInverse(den, p)
	if inv == nil {
		// If the modular inverse does not exist, panic.
		panic("No modular inverse for denominator")
	}
	// Compute (num * inv) % p
	return new(big.Int).Mod(new(big.Int).Mul(num, inv), p)
}

// lagrangeInterpolate performs Lagrange interpolation at a given x value.
// It reconstructs the original polynomial using the provided points (x_s, y_s)
// and evaluates it at x. In this case, we usually set x = 0 to find the secret.
func lagrangeInterpolate(x *big.Int, x_s, y_s []*big.Int, p *big.Int) *big.Int {
	k := len(x_s) // Number of points/shares

	// Ensure that all x coordinates are distinct.
	x_s_set := make(map[string]bool)
	for _, xi := range x_s {
		key := xi.String()
		if x_s_set[key] {
			panic("Points must be distinct")
		}
		x_s_set[key] = true
	}

	// Prepare arrays for numerators and denominators.
	nums := make([]*big.Int, k) // Numerators
	dens := make([]*big.Int, k) // Denominators

	// Calculate the Lagrange basis polynomials.
	for i := 0; i < k; i++ {
		num_accum := big.NewInt(1) // Numerator accumulator
		den_accum := big.NewInt(1) // Denominator accumulator

		for j := 0; j < k; j++ {
			if i == j {
				continue // Skip the current term
			}
			xi := x_s[i]
			xj := x_s[j]

			// Calculate numerator: num_accum *= (x - xj) % p
			tempNum := new(big.Int).Sub(x, xj)
			tempNum.Mod(tempNum, p)
			num_accum.Mul(num_accum, tempNum)
			num_accum.Mod(num_accum, p)

			// Calculate denominator: den_accum *= (xi - xj) % p
			tempDen := new(big.Int).Sub(xi, xj)
			tempDen.Mod(tempDen, p)
			den_accum.Mul(den_accum, tempDen)
			den_accum.Mod(den_accum, p)
		}
		nums[i] = num_accum // Store the numerator for term i
		dens[i] = den_accum // Store the denominator for term i
	}

	result := big.NewInt(0) // Initialize the result

	// Combine the terms to compute the final value.
	for i := 0; i < k; i++ {
		// term = y_s[i] * nums[i] * inv_mod(dens[i], p)
		term := divmod(nums[i], dens[i], p) // Compute nums[i] / dens[i] mod p
		term.Mul(term, y_s[i])              // Multiply by y_s[i]
		term.Mod(term, p)                   // term = term % p
		result.Add(result, term)            // Add to the result
		result.Mod(result, p)               // result = result % p
	}
	return result // This is the interpolated value at x
}

// recoverSecret recovers the secret from a subset of shares.
// It extracts the x and y coordinates from the shares and performs interpolation.
func recoverSecret(shares [][2]*big.Int, prime *big.Int) *big.Int {
	if len(shares) < 3 {
		// Need at least 'minimum' number of shares to recover the secret.
		panic("Need at least three shares")
	}

	// Extract x and y coordinates from the shares.
	x_s := make([]*big.Int, len(shares))
	y_s := make([]*big.Int, len(shares))
	for i, share := range shares {
		x_s[i] = share[0] // x coordinate
		y_s[i] = share[1] // y coordinate
	}

	// Perform Lagrange interpolation at x = 0 to find the secret.
	return lagrangeInterpolate(big.NewInt(0), x_s, y_s, prime)
}

// bytesToBigInt converts a byte slice to a big.Int
func bytesToBigInt(bytes []byte) *big.Int {
	result := big.NewInt(0)
	for _, b := range bytes {
		result.Lsh(result, 8)
		result.Add(result, big.NewInt(int64(b)))
	}
	return result
}

// bigIntToBytes converts a big.Int back to a byte slice of specified length
func bigIntToBytes(n *big.Int, length int) []byte {
	bytes := make([]byte, length)
	temp := new(big.Int).Set(n)
	for i := length - 1; i >= 0; i-- {
		mod := new(big.Int)
		temp.DivMod(temp, big.NewInt(256), mod)
		bytes[i] = byte(mod.Int64())
	}
	return bytes
}

func main() {
	// Define the AES-128-CBC key (16 bytes)
	key := []byte("973D9D2C6DF8F66F")
	if len(key) != 16 {
		panic("Key must be exactly 16 bytes for AES-128-CBC")
	}

	// Convert key bytes to big.Int
	secret := bytesToBigInt(key)

	// Generate shares from the secret
	shares := makeRandomShares(secret, 3, 6, PRIME)

	// Display the original key in hex format
	fmt.Printf("Original AES key (hex): %X\n", key)

	// Display the generated shares in hex format
	fmt.Println("\nShares (in hex format):")
	fmt.Println("Share # | X coordinate | Y coordinate")
	fmt.Println("--------|--------------|--------------")
	for i, share := range shares {
		fmt.Printf("Share %d | %X | %X\n", i+1, share[0], share[1])
	}

	// Recover the secret using the first three shares
	fmt.Println("\n=== Using first three shares ===")
	recoveredSecret1 := recoverSecret(shares[:3], PRIME)
	recoveredKey1 := bigIntToBytes(recoveredSecret1, 16)
	fmt.Printf("Key recovered from minimum subset of shares (hex): %X\n", recoveredKey1)

	// Recover the secret using the last three shares
	fmt.Println("\n=== Using last three shares ===")
	recoveredSecret2 := recoverSecret(shares[3:], PRIME)
	recoveredKey2 := bigIntToBytes(recoveredSecret2, 16)
	fmt.Printf("Key recovered from a different minimum subset of shares (hex): %X\n", recoveredKey2)
}
