# ROS kompatibilis Gokart Web Telemetria

## Telepítési útmutató

Végezzük el a következő kódok futtatását a parancssorban.  
  ### 1.Source.list beállítása  
        •	sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
        
  ### 2.Kulcsok beállítása  
        •	sudo apt install curl #  
        •	curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add –  
  
  ### 3.ROS csomagok telepítése
        •	sudo apt update
        •	sudo apt install ros-melodic-desktop-full
        
  ### 4.Környezet beállítása
        •	echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
        •	source ~/.bashrc
        
  ### 5.Csomagok függőségeinek beállítása
        •	sudo apt install python-rosdep python-rosinstall python-rosinstall-generator python-wstool build-essential
        
  ### 6. Rosdep inicializálása
        •	sudo apt install python-rosdep
        •	sudo rosdep init
        •	rosdep update
        
A fenti lépéseket végrehajtva a ROS melodic sikeresen telepítve lett. Azonban a projekt megfelelő működtetéséhez a következő kódokat is futtatnunk kell.

  ### 7.Catkin tools telepítése
        •	sudo apt-get install python-catkin-tools
        
  ### 8.Mappa kialakítása
        •	mkdir -p ~/catkin_ws/src
        •	cd ~/catkin_ws/
        •	catkin build
        •	catkin init
  
  ### 9.~/.bashrc fájl végére az alábbi sort betenni
        •	source ~/catkin_ws/devel/setup.bash
        
  ### 10.dwm1001 üzenetek telepítése
        •	cd ~/catkin_ws/src
        •	git clone https://github.com/naveenbiitk/dwm1001
        •	catkin build dwm1001
        •	source ~/.bashrc
        
  ### 11.Rosbridge installálása
        •	sudo apt-get install ros-melodic-rosbridge-server
        
A következő lépésben a Visual Stúdió kódszerkesztő programot kell telepíteni. Miután ezt az internetről feltelepítettük az alábbi github kód segítségével be tudjuk importálni a kódot. A 4. sor a program indításáért felel.

        •	cd ~/catkin_ws/src/
        •	git clone https://github.com/bodogadrian/Gokart_telemetria.git
        •	cd ~/catkin_ws/src/Gokart_telemetria/Szakdolgozat_nodejs
        •	. code

A projekthez szükséges soron következő lépés az adatbázis telepítése és a táblák létrehozása. Ennek érdekében kiexportáltam az adatokat, melyet a letöltés után az alábbiak szerint importálni kell az adatbázisba, melynél fontos, hogy a neve db legyen.
A MySQL letöltését a terminálba írva a következőképpen végezhetjük el.

        •	sudo apt update
        •	sudo apt install mysql-server
        •	sudo mysql_secure_installation
A feljövő üzenetekre válaszoljunk az alábbiak szerint.  
      y | 0 | password | y | y | n | n | y  
        
        •	sudo mysql  
        •	select user, authentication_string, plugin from mysql.user;  
        •	ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'password'  
        •	FLUSH PRIVILEGES;  
        •	sudo mysql -u root -p  
        
A szoftverkezelőből töltsük le a MySQL Workbenchet és a Connection Name lehetőséghez írjuk be, hogy local, a jelszóhoz pedig az eddig használt jelszavunk. Miután sikeresen beléptünk a felületre, hozzunk létre egy új táblát db néven.  
Miután ez megtörtént a Server fül alatt kattintsunk a Data Import lehetőségre, ahol válasszuk ki a projektünk database almappáját és importáljuk be a fájljainkat.
A munka utolsó lépése, hogy a nodejs verzióját feltelepítsük az alábbiak szerint.

        •	curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
        •	sudo apt-get install -y nodejs
        
Most már lehetővé válik az, hogy az adott programkóddal elindítsuk és működtessük projektünket a `localhost:5000` alatt.  
        
        •	npm start
        
#Tippek, hogy jól működjön a projekt:
  - Az üzemeltető első futtatásakor ha a robot nem csatlakozik a gokartokhoz, akkor frissítsük az oldalt.
  - A pályarajz exportálásánál a gokarts.csv fájl a csv mappába legyen elmentve.




    



   

  
