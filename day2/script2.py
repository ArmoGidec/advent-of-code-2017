'''Script for 2nd day task'''
F = open('day2/input.txt')

SUM = 0

for line in F:
    a = [int(i) for i in line.split()]
    for i, val1 in enumerate(a):
        for j, val2 in enumerate(a):
            if val1 % val2 == 0 and i != j:
                SUM += val1 / val2

print SUM
