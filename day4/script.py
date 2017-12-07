def word_to_dict(word):  
    return {i: 0 for i in set(word)}


def main():
    F = open('day4/input.txt')

    valid_lines = 0
    for line in F:
        is_valid = True
        b = []
        for word in line.split():
            i = word_to_dict(word)
            if i in b:
                is_valid = False
                break
            b.append(i)
        if is_valid:
            valid_lines += 1

    print valid_lines


if __name__ == '__main__':
    main()
