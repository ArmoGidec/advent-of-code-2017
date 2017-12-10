MAX = 0


def toDoInstruction(string_condition, instruction, registers):
    global MAX
    condition = eval(' '.join(string_condition))
    exec_obj = compile(''.join(instruction), '<string>', 'exec')
    if (condition):
        exec exec_obj

    value = eval(instruction[0])
    if value > MAX:
        MAX = value


def main():
    global MAX
    f = open('day8/input.txt')

    registers_names = set()
    instructions = []
    for line in f:
        instruction = line.split()
        instructions.append(instruction)
        registers_names.add(instruction[0])

    registers = dict.fromkeys(registers_names, 0)
    # eval('registers[\'ioe\']=1')
    # print  registers['ioe']

    for instruction in instructions:
        condition_instruction = [
            'registers[\'' + instruction[4] + '\']', instruction[5], instruction[6]]

        inc_dec = '+' if instruction[1] == 'inc' else '-'
        string_instruction = [
            'registers[\'' + instruction[0] + '\']', inc_dec + '=', instruction[2]]

        toDoInstruction(condition_instruction, string_instruction, registers)

    # registers_values = registers.values()
    # MAX = max(registers_values)
    print MAX


if __name__ == '__main__':
    main()
