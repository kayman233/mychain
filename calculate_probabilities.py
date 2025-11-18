#!/usr/bin/env python3
"""
Расчет вероятностей для системы безопасного хранения с использованием схемы Шамира
"""

import math

def binomial_coefficient(n, k):
    """Вычисляет биномиальный коэффициент C(n,k)"""
    if k > n or k < 0:
        return 0
    if k == 0 or k == n:
        return 1
    return math.factorial(n) // (math.factorial(k) * math.factorial(n - k))

def binomial_probability(n, k, p):
    """Вычисляет биномиальную вероятность P(X = k) для n испытаний с вероятностью успеха p"""
    return binomial_coefficient(n, k) * (p ** k) * ((1 - p) ** (n - k))

def compromise_probability(n, k, p):
    """
    Вероятность компрометации системы
    P_comp = sum_{i=k}^{n} C(n,i) * p^i * (1-p)^{n-i}
    где p - вероятность компрометации одного guardian
    """
    prob = 0
    for i in range(k, n + 1):
        prob += binomial_probability(n, i, p)
    return prob

def unavailability_probability(n, k, q):
    """
    Вероятность недоступности системы
    P_unavail = sum_{i=n-k+1}^{n} C(n,i) * q^i * (1-q)^{n-i}
    где q - вероятность недоступности одного guardian
    """
    prob = 0
    for i in range(n - k + 1, n + 1):
        prob += binomial_probability(n, i, q)
    return prob

def main():
    print("=== Расчет вероятностей для системы Shamir Secret Sharing ===\n")
    
    # Параметры системы
    n = 5  # общее количество guardians
    k = 3  # пороговое количество для восстановления
    
    print(f"Конфигурация системы: ({k},{n})-схема Шамира")
    print(f"- Общее количество guardians: {n}")
    print(f"- Пороговое количество для восстановления: {k}")
    print(f"- Максимальное количество отказов: {n-k}")
    print()
    
    # Расчет вероятности компрометации
    print("1. ВЕРОЯТНОСТЬ КОМПРОМЕТАЦИИ")
    print("=" * 40)
    
    p_values = [0.05, 0.1, 0.15, 0.2]
    
    for p in p_values:
        p_comp = compromise_probability(n, k, p)
        print(f"При p = {p:4.2f} (вероятность компрометации guardian): P_comp = {p_comp:.6f} ({p_comp*100:.4f}%)")
    
    print()
    
    # Расчет вероятности недоступности
    print("2. ВЕРОЯТНОСТЬ НЕДОСТУПНОСТИ")
    print("=" * 40)
    
    q_values = [0.1, 0.15, 0.2, 0.25]
    
    for q in q_values:
        p_unavail = unavailability_probability(n, k, q)
        print(f"При q = {q:4.2f} (вероятность недоступности guardian): P_unavail = {p_unavail:.6f} ({p_unavail*100:.4f}%)")
    
    print()
    
    # Детальный расчет для конкретных значений из статьи
    print("3. ДЕТАЛЬНЫЙ РАСЧЕТ ДЛЯ СТАТЬИ")
    print("=" * 40)
    
    p = 0.1  # вероятность компрометации
    q = 0.2  # вероятность недоступности
    
    print(f"\nДля схемы ({k},{n}) с p = {p} и q = {q}:")
    
    # Компрометация: нужно скомпрометировать минимум k guardians
    p_comp = compromise_probability(n, k, p)
    print(f"\nВероятность компрометации:")
    print(f"P_comp = Σ(i={k} to {n}) C({n},i) × {p}^i × {1-p}^({n}-i)")
    
    for i in range(k, n + 1):
        prob_i = binomial_probability(n, i, p)
        print(f"  i={i}: C({n},{i}) × {p}^{i} × {1-p}^{n-i} = {prob_i:.8f}")
    
    print(f"P_comp = {p_comp:.8f} ≈ {p_comp:.5f}")
    
    # Недоступность: нужно чтобы отказало больше чем n-k guardians
    p_unavail = unavailability_probability(n, k, q)
    print(f"\nВероятность недоступности:")
    print(f"P_unavail = Σ(i={n-k+1} to {n}) C({n},i) × {q}^i × {1-q}^({n}-i)")
    
    for i in range(n - k + 1, n + 1):
        prob_i = binomial_probability(n, i, q)
        print(f"  i={i}: C({n},{i}) × {q}^{i} × {1-q}^{n-i} = {prob_i:.8f}")
    
    print(f"P_unavail = {p_unavail:.8f} ≈ {p_unavail:.5f}")
    
    print(f"\n=== РЕЗУЛЬТАТЫ ДЛЯ СТАТЬИ ===")
    print(f"При p = {p}: P_comp ≈ {p_comp:.5f} ({p_comp*100:.3f}%)")
    print(f"При q = {q}: P_unavail ≈ {p_unavail:.5f} ({p_unavail*100:.3f}%)")

if __name__ == "__main__":
    main() 
