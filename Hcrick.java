import java.lang.Math;
import java.util.Scanner;

class Hcrick{
	public static int getRandomNumber() {
		    return (int)(Math.random() * (6 - 1) + 1);
	}
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
		int runsbyu = 0;
		int runsbyc = 0;
		int user = 0;
		var o = System.out;
		o.println("You are batting \n");
		boolean userball = false;
		while (0 == 0){
			int comp = 	getRandomNumber();
			o.println("Enter your runs (from 1 to 6) \n");
			user = sc.nextInt();
			if(user > 6){
				o.println("taking this run as 6 as you entered more than 6");
				user = 6;
			}
			if(comp == user){
				runsbyu += user;
				o.println("\nUser out!\nRuns made by the user: " + runsbyu + "\n");
				userball = true;
				break;
			}else{
				o.println("Computer : "+comp+"\n");
				runsbyu += user;
			}
		}
		if(userball){
			o.println("You are balling\n");
			while(0 == 0){
				int comp = getRandomNumber();
				o.println("Enter your guess (from 1 to 6) \n");
				user = sc.nextInt();
				if(user > 6){
					o.println("taking this run as 6 as you entered more than 6");
					user = 6;
				}
				if(comp == user){
					runsbyc += user;
					o.println("\nComputer out && User Won! \nRuns made by the Computer: " + runsbyc + "\n");
					break;
				}else if(runsbyc >= runsbyu || comp >= runsbyu){
					o.println("Computer : " + comp + "\n");
					runsbyc += comp;
					o.println("\nMatch ended! Computer Won!\n Runs by Computer : " + runsbyc + "\n");
					break;
				}else{
					o.println("Computer : "+comp+"\n");
					runsbyc += comp;						
				}
			}
		}
	} 
}
