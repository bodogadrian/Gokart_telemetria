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


   

  
