#include <stdlib.h>
#include <iostream>
using namespace std;

int main(){
	int runsbyu = 0;
	int runsbyc = 0;
	int user;
	cout << "You are batting \n";
	bool userball = false;
	while (0 == 0){
	int comp = 1 + (rand() % 6);
	cout << "Enter your runs (from 1 to 6) \n";
	cin >> user;
	if(user > 6){
		cout << "taking this run as 6 as you entered more than 6";
		user = 6;
	}
	if(comp == user){
		runsbyu += user;
		cout << "\nUser out!\nRuns made by the user: " << runsbyu << "\n";
		userball = true;
		break;
	}else{
		cout << "Computer : " << comp << "\n";
		runsbyu += user;
	}
	}
	if(userball){
	cout << "You are balling\n";
	while (0 == 0){
	int comp = 1 + (rand() % 6);
	cout << "Enter your guess (from 1 to 6) \n";
	cin >> user;
	if(user > 6){
		cout << "taking this guess as 6 as you entered more than 6";
		user = 6;
	}
	if(comp == user){
		runsbyc += user;
		cout << "\nComputer out && User Won! \nRuns made by the Computer: " << runsbyc << "\n";
		break;
	}else if(runsbyc >= runsbyu || comp >= runsbyu ){
		cout << "Computer : " << comp << "\n";
		runsbyc += comp;
		cout << "\nMatch ended! Computer Won!\n Runs by Computer : " << runsbyc << "\n";
		break;
	}else{
		cout << "Computer : " << comp << "\n";
		runsbyc += comp;
	}	 
	}
	}
	return 0;
}
