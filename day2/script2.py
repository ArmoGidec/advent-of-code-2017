file = open('input.txt')

sum = 0

for line in file:
    a = [int(i) for i in line.split()]
    sum += (max(a) - min(a))

print(sum)
