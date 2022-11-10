# starting_possible_solutions_file = open("wordle_solutions.txt", "r")

# f = open("solution_words.js", "a")
# f.write("export const WORDS = [\n")
# for line in starting_possible_solutions_file:
#     f.write("'" + line[0:-1] + "',\n")
# f.write("]")
# f.close()

# starting_possible_solutions_file.close()




guesses_file = open("wordle_guesses.txt", "r")

f = open("guess_words.js", "a")
f.write("export const WORDS = [\n")
for line in guesses_file:
    f.write("'" + line[0:-1] + "',\n")
f.write("]")
f.close()

guesses_file.close()


