# import time
from statistics import pstdev

starting_possible_solutions_file = open("Text files/wordle_solutions.txt", "r")
starting_possible_solutions_list = (starting_possible_solutions_file.read()).split("\n")[0:-1]
for i in range(0, len(starting_possible_solutions_list)):
    word = starting_possible_solutions_list[i]
    starting_possible_solutions_list[i] = [*word]
starting_possible_solutions_file.close()
# print(starting_possible_solutions_list)

possible_guesses_file = open("Text files/wordle_guesses.txt", "r")
possible_guesses_list = (possible_guesses_file.read()).split("\n")[0:-1]
for i in range(0, len(possible_guesses_list)):
    word = possible_guesses_list[i]
    possible_guesses_list[i] = [*word]
possible_guesses_file.close()


guesses = []





def build_color_code(guess, solution):
    # print(f"guess {guess} and solution {solution}")
    # print(guess)
    # print(solution)

    color_code_arr = ['','','','','']
    compared_solution = ['','','','','']

    for i in range(0,5):
        if guess[i] == solution[i]:
            color_code_arr[i] = '2'
        elif guess[i] not in solution:
            color_code_arr[i] = '0'
            compared_solution[i] = solution[i]
        elif guess.count(guess[i]) <= solution.count(guess[i]):
            color_code_arr[i] = '1'
            compared_solution[i] = solution[i]
        else:
            compared_solution[i] = solution[i]

    for i in range(0,5):
        if color_code_arr[i] == '':
            if guess[i] not in compared_solution:
                color_code_arr[i] = '0'
            else:
                color_code_arr[i] = '1'
                compared_solution.remove(guess[i])
    # print(compared_solution)
    # print(color_code_arr)
    return ''.join(color_code_arr)


def evaluate_word(guess, possible_solutions_list):
    buckets = {'00000': 0, '00001': 0, '00002': 0, '00010': 0, '00011': 0, '00012': 0, 
    '00020': 0, '00021': 0, '00022': 0, '00100': 0, '00101': 0, '00102': 0, '00110': 0, 
    '00111': 0, '00112': 0, '00120': 0, '00121': 0, '00122': 0, '00200': 0, '00201': 0, 
    '00202': 0, '00210': 0, '00211': 0, '00212': 0, '00220': 0, '00221': 0, '00222': 0, 
    '01000': 0, '01001': 0, '01002': 0, '01010': 0, '01011': 0, '01012': 0, '01020': 0, 
    '01021': 0, '01022': 0, '01100': 0, '01101': 0, '01102': 0, '01110': 0, '01111': 0, 
    '01112': 0, '01120': 0, '01121': 0, '01122': 0, '01200': 0, '01201': 0, '01202': 0, 
    '01210': 0, '01211': 0, '01212': 0, '01220': 0, '01221': 0, '01222': 0, '02000': 0, 
    '02001': 0, '02002': 0, '02010': 0, '02011': 0, '02012': 0, '02020': 0, '02021': 0, 
    '02022': 0, '02100': 0, '02101': 0, '02102': 0, '02110': 0, '02111': 0, '02112': 0, 
    '02120': 0, '02121': 0, '02122': 0, '02200': 0, '02201': 0, '02202': 0, '02210': 0, 
    '02211': 0, '02212': 0, '02220': 0, '02221': 0, '02222': 0, '10000': 0, '10001': 0, 
    '10002': 0, '10010': 0, '10011': 0, '10012': 0, '10020': 0, '10021': 0, '10022': 0, 
    '10100': 0, '10101': 0, '10102': 0, '10110': 0, '10111': 0, '10112': 0, '10120': 0, 
    '10121': 0, '10122': 0, '10200': 0, '10201': 0, '10202': 0, '10210': 0, '10211': 0, 
    '10212': 0, '10220': 0, '10221': 0, '10222': 0, '11000': 0, '11001': 0, '11002': 0, 
    '11010': 0, '11011': 0, '11012': 0, '11020': 0, '11021': 0, '11022': 0, '11100': 0, 
    '11101': 0, '11102': 0, '11110': 0, '11111': 0, '11112': 0, '11120': 0, '11121': 0, 
    '11122': 0, '11200': 0, '11201': 0, '11202': 0, '11210': 0, '11211': 0, '11212': 0, 
    '11220': 0, '11221': 0, '11222': 0, '12000': 0, '12001': 0, '12002': 0, '12010': 0, 
    '12011': 0, '12012': 0, '12020': 0, '12021': 0, '12022': 0, '12100': 0, '12101': 0, 
    '12102': 0, '12110': 0, '12111': 0, '12112': 0, '12120': 0, '12121': 0, '12122': 0, 
    '12200': 0, '12201': 0, '12202': 0, '12210': 0, '12211': 0, '12212': 0, '12220': 0, 
    '12221': 0, '12222': 0, '20000': 0, '20001': 0, '20002': 0, '20010': 0, '20011': 0, 
    '20012': 0, '20020': 0, '20021': 0, '20022': 0, '20100': 0, '20101': 0, '20102': 0, 
    '20110': 0, '20111': 0, '20112': 0, '20120': 0, '20121': 0, '20122': 0, '20200': 0, 
    '20201': 0, '20202': 0, '20210': 0, '20211': 0, '20212': 0, '20220': 0, '20221': 0, 
    '20222': 0, '21000': 0, '21001': 0, '21002': 0, '21010': 0, '21011': 0, '21012': 0, 
    '21020': 0, '21021': 0, '21022': 0, '21100': 0, '21101': 0, '21102': 0, '21110': 0, 
    '21111': 0, '21112': 0, '21120': 0, '21121': 0, '21122': 0, '21200': 0, '21201': 0, 
    '21202': 0, '21210': 0, '21211': 0, '21212': 0, '21220': 0, '21221': 0, '21222': 0, 
    '22000': 0, '22001': 0, '22002': 0, '22010': 0, '22011': 0, '22012': 0, '22020': 0, 
    '22021': 0, '22022': 0, '22100': 0, '22101': 0, '22102': 0, '22110': 0, '22111': 0, 
    '22112': 0, '22120': 0, '22121': 0, '22122': 0, '22200': 0, '22201': 0, '22202': 0, 
    '22210': 0, '22211': 0, '22212': 0, '22220': 0, '22221': 0, '22222': 0}

    for possible_solution in possible_solutions_list:
        color_code = build_color_code(guess,possible_solution)
        buckets[color_code] += 1
    
    # print(buckets)
    return buckets


def calculate_std_dev(buckets):
    std_dev = pstdev(list(buckets.values()))
    # print(std_dev)
    return std_dev


def find_optimal_words(possible_solutions_list):
    std_devs = {}
    for guess in possible_guesses_list:
        std_devs[''.join(guess)] = calculate_std_dev(evaluate_word(guess, possible_solutions_list))
    min_std_dev = min(std_devs.values())
    best_guesses = [word for word in std_devs if std_devs[word] == min_std_dev]
    # print(f"The minimum standard deviation is {min_std_dev}")
    # print(f"The optimal words to guess are {best_guesses}")
    return best_guesses


def determine_possible_solutions(guess, ans, possible_solutions):
    new_possible_solutions = []
    color_code = build_color_code(guess, ans)

    for word in possible_solutions:
        test_color_code = build_color_code(guess,word)
        if test_color_code == color_code:
            new_possible_solutions.append(word)
        
    # print(new_possible_solutions)
    return new_possible_solutions


def validate_input(word, use):
    match use:
        case 'guess':
            if len(word) != 5:
                print("word not 5 letters long")
                return False
            else:
                if [*word] not in possible_guesses_list:
                    print("word not in valid solutions lst")
                    return False
            return True
        case 'solution':
            if len(word) != 5:
                print("word not 5 letters long")
                return False
            else:
                if [*word] not in starting_possible_solutions_list:
                    print("word not in valid solutions lst")
                    return False
            return True


def play(ans,possible_solutions_list,special_run):

    if not special_run:
        best_guess = find_optimal_words(possible_solutions_list)
        if len(best_guess) == 1:
            print(f"The optimal guess is: {''.join(best_guess)}")
        else:
            print(f"There are {len(best_guess)} equally optimal guesses. Here's one of them: '{best_guess[0]}'.")
            
    guess = input(f"\nEnter your guess: ").lower()
    while not validate_input(guess, 'guess'):
        print("Invalid guess.")
        guess = input(f"Please enter a different guess: ")
    guesses.append(guess)
    guess = [*guess]

    if guess == ans:
        print("\nCongratulations, you've solved the word!")
        return 
    else:
        new_possible_solutions_list = determine_possible_solutions(guess,ans,possible_solutions_list)
        if len(new_possible_solutions_list) == 2:
            print(f"There are only two possible solutions left: '{''.join(new_possible_solutions_list[0])}' or '{''.join(new_possible_solutions_list[1])}'.")
            play(ans,new_possible_solutions_list, True)
        elif len(new_possible_solutions_list) == 1:
            print(f"There is only one possble solution left: '{''.join(new_possible_solutions_list[0])}'.")
            play(ans,new_possible_solutions_list, True)
        else:
            print(f"There are now {len(new_possible_solutions_list)} possible solutions.")
            
            play(ans,new_possible_solutions_list, False)


def main():
    print(f"\nWelcome to the Wordle Optimizer!\n")
    ans = input(f"Enter the word to be optimized: ").lower()
    while not validate_input(ans,'solution'):
        print("Invalid solution word.")
        ans = input(f"Please enter a new word to be optimized: ").lower()
    ans = [*ans]

    print(f"The optimal guess is: 'roate'.")
    play(ans, starting_possible_solutions_list,True)
    
    print("Your guesses:")
    for i in range(1,len(guesses)+1):
        print(f"{i}. {guesses[i-1]}")
        


main()