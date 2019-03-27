# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-03-27  Python: 3.7


def to_base36(value):
    """converts a decimal integer to a 36 decimal string"""
    if not isinstance(value, int):
        raise TypeError("expected int, got %s: %r" % (value.__class__.__name__, value))

    if value == 0:
        return "0"

    if value < 0:
        sign = "-"
        value = -value
    else:
        sign = ""

    result = []

    while value:
        value, mod = divmod(value, 36)
        result.append("0123456789abcdefghijklmnopqrstuvwxyz"[mod])

    return sign + "".join(reversed(result))


def decode(C):
    """parse poi"""
    digi = 16
    add = 10
    plus = 7
    cha = 36
    I = -1
    H = 0
    B = ''
    J = len(C)
    G = ord(C[-1])
    C = C[:-1]
    J -= 1

    for E in range(J):
        D = int(C[E], cha) - add
        if D >= add:
            D = D - plus
        B += to_base36(D)
        if D > H:
            I = E
            H = D

    A = int(B[:I], digi)
    F = int(B[I + 1:], digi)
    L = (A + F - int(G)) / 2
    K = float(F - L) / 100000
    L = float(L) / 100000
    return {'lng': L, 'lat': K}


if __name__ == '__main__':
    print(decode('HFHSGGZTWSATFG'))
