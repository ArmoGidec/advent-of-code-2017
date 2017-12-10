f = open('day9/input.txt')

score = 0
text = [line for line in f][0]
# text = '{{<a!>},{<a!>},{<a!>},{<ab>}}'

value = 0
group_opened = 0
trash_opened = False
ignored = False
characters_in_trash = 0
for i in text:
    if ignored:
        ignored = False
    elif i == '{' and not ignored and not trash_opened:
        group_opened += 1
        value += 1
    elif i == '}' and group_opened > 0 and not trash_opened:
        score += value
        value -= 1
        group_opened -= 1
    elif i == '<' and not trash_opened and not ignored:
        trash_opened = True
    elif i == '>' and not ignored:
        trash_opened = False
    elif i == '!':
        ignored = not ignored
    elif trash_opened:
        characters_in_trash += 1
print score, characters_in_trash
