f = open('day5/input.txt')
a = [int(line) for line in f]
f.close()

steps = 0
index = 0

while(True):
    try:
        prev_index = index
        index += a[index]
        if a[prev_index] >= 3:
            a[prev_index] -= 1
        else:
            a[prev_index] += 1
        steps += 1
    except IndexError:
        print steps
        break
