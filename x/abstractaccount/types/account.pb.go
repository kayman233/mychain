// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: abstractaccount/v1/account.proto

package types

import (
	fmt "fmt"
	_ "github.com/cosmos/cosmos-proto"
	_ "github.com/cosmos/cosmos-sdk/codec/types"
	_ "github.com/cosmos/cosmos-sdk/x/auth/types"
	_ "github.com/cosmos/gogoproto/gogoproto"
	proto "github.com/cosmos/gogoproto/proto"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

// AbstractAccount is a smart contract that is capable of initiating txs.
//
// This account type is similar to BaseAccount except for it doesn't have a
// pubkey. If a pubkey is needed, it creates and returns a new NilPubKey.
type AbstractAccount struct {
	Address       string `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"`
	AccountNumber uint64 `protobuf:"varint,2,opt,name=account_number,json=accountNumber,proto3" json:"account_number,omitempty"`
	Sequence      uint64 `protobuf:"varint,3,opt,name=sequence,proto3" json:"sequence,omitempty"`
}

func (m *AbstractAccount) Reset()         { *m = AbstractAccount{} }
func (m *AbstractAccount) String() string { return proto.CompactTextString(m) }
func (*AbstractAccount) ProtoMessage()    {}
func (*AbstractAccount) Descriptor() ([]byte, []int) {
	return fileDescriptor_6fd3a1ec6e182f00, []int{0}
}
func (m *AbstractAccount) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *AbstractAccount) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_AbstractAccount.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *AbstractAccount) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AbstractAccount.Merge(m, src)
}
func (m *AbstractAccount) XXX_Size() int {
	return m.Size()
}
func (m *AbstractAccount) XXX_DiscardUnknown() {
	xxx_messageInfo_AbstractAccount.DiscardUnknown(m)
}

var xxx_messageInfo_AbstractAccount proto.InternalMessageInfo

// NilPubKey is the pubkey type of the AbstractAccount. Basically, it represents
// a pubkey that doesn't exist.
//
// The actual pubkey of an AbstractAccount (if it has one) is to be stored
// inside the contract, not at the SDK level. Signature verification is also
// done inside the contract, typically in the BeforeTx hook.
type NilPubKey struct {
	AddressBytes []byte `protobuf:"bytes,1,opt,name=address_bytes,json=addressBytes,proto3" json:"address_bytes,omitempty"`
}

func (m *NilPubKey) Reset()      { *m = NilPubKey{} }
func (*NilPubKey) ProtoMessage() {}
func (*NilPubKey) Descriptor() ([]byte, []int) {
	return fileDescriptor_6fd3a1ec6e182f00, []int{1}
}
func (m *NilPubKey) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *NilPubKey) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_NilPubKey.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *NilPubKey) XXX_Merge(src proto.Message) {
	xxx_messageInfo_NilPubKey.Merge(m, src)
}
func (m *NilPubKey) XXX_Size() int {
	return m.Size()
}
func (m *NilPubKey) XXX_DiscardUnknown() {
	xxx_messageInfo_NilPubKey.DiscardUnknown(m)
}

var xxx_messageInfo_NilPubKey proto.InternalMessageInfo

func (m *NilPubKey) GetAddressBytes() []byte {
	if m != nil {
		return m.AddressBytes
	}
	return nil
}

func init() {
	proto.RegisterType((*AbstractAccount)(nil), "abstractaccount.v1.AbstractAccount")
	proto.RegisterType((*NilPubKey)(nil), "abstractaccount.v1.NilPubKey")
}

func init() { proto.RegisterFile("abstractaccount/v1/account.proto", fileDescriptor_6fd3a1ec6e182f00) }

var fileDescriptor_6fd3a1ec6e182f00 = []byte{
	// 335 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x52, 0x48, 0x4c, 0x2a, 0x2e,
	0x29, 0x4a, 0x4c, 0x2e, 0x49, 0x4c, 0x4e, 0xce, 0x2f, 0xcd, 0x2b, 0xd1, 0x2f, 0x33, 0xd4, 0x87,
	0x32, 0xf5, 0x0a, 0x8a, 0xf2, 0x4b, 0xf2, 0x85, 0x84, 0xd0, 0x54, 0xe8, 0x95, 0x19, 0x4a, 0xc9,
	0x25, 0xe7, 0x17, 0xe7, 0xe6, 0x17, 0xeb, 0x27, 0x96, 0x96, 0x64, 0xe8, 0x97, 0x19, 0x26, 0xa5,
	0x96, 0x24, 0x1a, 0x82, 0x39, 0x10, 0x3d, 0x52, 0x92, 0x10, 0xf9, 0x78, 0x30, 0x4f, 0x1f, 0xc2,
	0x81, 0x4a, 0x89, 0xa4, 0xe7, 0xa7, 0xe7, 0x43, 0xc4, 0x41, 0x2c, 0x98, 0x86, 0xf4, 0xfc, 0xfc,
	0xf4, 0x9c, 0x54, 0x7d, 0x30, 0x2f, 0xa9, 0x34, 0x4d, 0x3f, 0x31, 0xaf, 0x12, 0x22, 0xa5, 0xb4,
	0x89, 0x91, 0x8b, 0xdf, 0x11, 0xea, 0x04, 0x47, 0x88, 0x13, 0x84, 0x8c, 0xb8, 0xd8, 0x13, 0x53,
	0x52, 0x8a, 0x52, 0x8b, 0x8b, 0x25, 0x18, 0x15, 0x18, 0x35, 0x38, 0x9d, 0x24, 0x2e, 0x6d, 0xd1,
	0x15, 0x81, 0xda, 0xe3, 0x08, 0x91, 0x09, 0x2e, 0x29, 0xca, 0xcc, 0x4b, 0x0f, 0x82, 0x29, 0x14,
	0x52, 0xe5, 0xe2, 0x83, 0xfa, 0x20, 0x3e, 0xaf, 0x34, 0x37, 0x29, 0xb5, 0x48, 0x82, 0x49, 0x81,
	0x51, 0x83, 0x25, 0x88, 0x17, 0x2a, 0xea, 0x07, 0x16, 0x14, 0x92, 0xe2, 0xe2, 0x28, 0x4e, 0x2d,
	0x2c, 0x4d, 0xcd, 0x4b, 0x4e, 0x95, 0x60, 0x06, 0x2b, 0x80, 0xf3, 0xad, 0x34, 0x3a, 0x16, 0xc8,
	0x33, 0xbc, 0x58, 0x20, 0xcf, 0x70, 0x6a, 0x8b, 0xae, 0x0c, 0xd4, 0x36, 0xb0, 0xaf, 0xa1, 0x41,
	0xa0, 0x07, 0x75, 0x9f, 0xa7, 0x92, 0x19, 0x17, 0xa7, 0x5f, 0x66, 0x4e, 0x40, 0x69, 0x92, 0x77,
	0x6a, 0xa5, 0x90, 0x32, 0x17, 0x2f, 0xd4, 0x11, 0xf1, 0x49, 0x95, 0x25, 0xa9, 0x10, 0x37, 0xf3,
	0x04, 0xf1, 0x40, 0x05, 0x9d, 0x40, 0x62, 0x56, 0x2c, 0x33, 0x16, 0xc8, 0x33, 0x38, 0x59, 0x9e,
	0x78, 0x24, 0xc7, 0x78, 0xe1, 0x91, 0x1c, 0xe3, 0x83, 0x47, 0x72, 0x8c, 0x13, 0x1e, 0xcb, 0x31,
	0x5c, 0x78, 0x2c, 0xc7, 0x70, 0xe3, 0xb1, 0x1c, 0x43, 0x94, 0x7c, 0x5e, 0x6a, 0x79, 0x49, 0x6a,
	0x71, 0x89, 0x7e, 0x85, 0x3e, 0x7a, 0x94, 0x95, 0x54, 0x16, 0xa4, 0x16, 0x27, 0xb1, 0x81, 0x83,
	0xcb, 0x18, 0x10, 0x00, 0x00, 0xff, 0xff, 0x7f, 0xd4, 0x61, 0xaa, 0xd2, 0x01, 0x00, 0x00,
}

func (m *AbstractAccount) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *AbstractAccount) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *AbstractAccount) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Sequence != 0 {
		i = encodeVarintAccount(dAtA, i, uint64(m.Sequence))
		i--
		dAtA[i] = 0x18
	}
	if m.AccountNumber != 0 {
		i = encodeVarintAccount(dAtA, i, uint64(m.AccountNumber))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Address) > 0 {
		i -= len(m.Address)
		copy(dAtA[i:], m.Address)
		i = encodeVarintAccount(dAtA, i, uint64(len(m.Address)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *NilPubKey) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *NilPubKey) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *NilPubKey) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.AddressBytes) > 0 {
		i -= len(m.AddressBytes)
		copy(dAtA[i:], m.AddressBytes)
		i = encodeVarintAccount(dAtA, i, uint64(len(m.AddressBytes)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintAccount(dAtA []byte, offset int, v uint64) int {
	offset -= sovAccount(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *AbstractAccount) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Address)
	if l > 0 {
		n += 1 + l + sovAccount(uint64(l))
	}
	if m.AccountNumber != 0 {
		n += 1 + sovAccount(uint64(m.AccountNumber))
	}
	if m.Sequence != 0 {
		n += 1 + sovAccount(uint64(m.Sequence))
	}
	return n
}

func (m *NilPubKey) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.AddressBytes)
	if l > 0 {
		n += 1 + l + sovAccount(uint64(l))
	}
	return n
}

func sovAccount(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozAccount(x uint64) (n int) {
	return sovAccount(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *AbstractAccount) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowAccount
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: AbstractAccount: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: AbstractAccount: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAccount
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthAccount
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthAccount
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field AccountNumber", wireType)
			}
			m.AccountNumber = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAccount
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.AccountNumber |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Sequence", wireType)
			}
			m.Sequence = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAccount
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Sequence |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipAccount(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthAccount
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *NilPubKey) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowAccount
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: NilPubKey: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: NilPubKey: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field AddressBytes", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAccount
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthAccount
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthAccount
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.AddressBytes = append(m.AddressBytes[:0], dAtA[iNdEx:postIndex]...)
			if m.AddressBytes == nil {
				m.AddressBytes = []byte{}
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipAccount(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthAccount
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipAccount(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowAccount
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowAccount
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowAccount
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthAccount
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupAccount
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthAccount
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthAccount        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowAccount          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupAccount = fmt.Errorf("proto: unexpected end of group")
)