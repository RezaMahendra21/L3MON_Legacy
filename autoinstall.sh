java_install() {
    sudo apt-get install -y openjdk-8-jdk
    sudo update-java-alternatives -s java-1.8.0-openjdk-amd64
    sudo update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
    sudo update-alternatives --set javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac
    sudo update-alternatives --set javaws /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/javaws
}

nodejs_install() {
  echo "Installing NodeJS..."
  curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
  sudo apt-get install -y nodejs
  echo "NodeJS installed"
}

npm_install() {
  echo "Installing NPM..."
  sudo npm install -g pm2
  echo "NPM installed"
}

git_install() {
  echo "Installing Git..."
  sudo apt-get install -y git
  echo "Git installed"
}

ufw_install() {
  echo "Installing UFW..."
  sudo apt-get install -y ufw
  echo "UFW installed"
}

nginx_install() {
  echo "Installing NGINX..."
  sudo apt-get install -y nginx
  echo "NGINX installed"
}

certbot_install() {
  echo "Installing Certbot..."
  sudo apt-get install -y certbot python3-certbot-nginx
  echo "Certbot installed"
}

pm2_install() {
  echo "Installing PM2..."
  sudo npm install -g pm2
  echo "PM2 installed"
}

# check if user is root
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

# set production or development mode
echo "Do you want to install L3MON in production mode or development mode?"
echo "1. Production"
echo "2. Development"
read -p "Enter your choice [1-2]: " choice
case $choice in
    1)
        echo "Installing in production mode"
        ENVIRONMENT="production"
        ;;
    2)
        echo "Installing in development mode"
        ENVIRONMENT="development"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

# update and upgrade
echo "Updating and upgrading..."
sudo apt-get update && sudo apt-get upgrade -y
echo "Update and upgrade done"

# check if java is installed
if [ -z "$(dpkg -l | grep openjdk-8-jre-headless)" ]; then
  echo "Java is not installed"
  java_install
fi

# check if nodejs is installed
if [ -z "$(command -v node)" ]; then
   echo "Nodejs is not installed" 1>&2
   nodejs_install
fi

# check if npm is installed
if [ -z "$(command -v npm)" ]; then
   echo "Npm is not installed" 1>&2
    npm_install
fi

# check if pm2 is installed
if [ -z "$(command -v pm2)" ]; then
   echo "PM2 is not installed" 1>&2
   pm2_install
fi

# check if git is installed
if [ -z "$(command -v git)" ]; then
   echo "Git is not installed" 1>&2
    git_install
fi

# check if ufw is installed
if [ -z "$(command -v ufw)" ]; then
   echo "Ufw is not installed" 1>&2
    ufw_install
fi

# check if nginx is installed
if [ -z "$(command -v nginx)" ]; then
   echo "Nginx is not installed" 1>&2
    nginx_install
fi

# check if certbot is installed
if [ -z "$(command -v certbot)" ]; then
   echo "Certbot is not installed" 1>&2
    certbot_install
fi

# clone the repo
echo "Cloning the repo..."
git clone https://github.com/karima940/L3MON.git
echo "Cloning the repo done"

# install the dependencies
echo "Installing the dependencies..."
npm i --prefix ./L3MON/server
echo "Installing the dependencies done"

# setup nginx
echo "Setting up nginx..."
read -p "Enter your domain name ( Example: yourdomain.com, example.io ): " DOMAIN
sudo sed -i 's/example.com/'$DOMAIN'/g' ./L3MON/conf.d/l3mon.conf
sudo cp ./L3MON/conf.d/l3mon.conf /etc/nginx/conf.d/l3mon.conf
sudo nginx -t
sudo systemctl reload nginx
echo "Nginx setup done"

# setup pm2
echo "Setting up pm2..."
cd ./L3MON/server
pm2 start index.js --name l3mon
pm2 save
echo "PM2 setup done"
sudo pm2 status
# sudo pm2 save
# sudo pm2 startup
# sudo pm2 save
echo "PM2 setup done"

# setup ufw firewall
echo "Setting up ufw firewall..."
sudo ufw enable
sudo ufw allow "Nginx Full"
sudo ufw delete allow "Nginx HTTP"
sudo ufw allow ssh
sudo ufw allow 22222/tcp
sudo ufw status
echo "Ufw firewall setup done"

# setup certbot
echo "Setting up certbot..."
if [ "$ENVIRONMENT" = "production" ]; then
  echo "Setting up certbot production server"
  sudo certbot --nginx -d $DOMAIN -d l3mon.$DOMAIN
else
  echo "Setting up certbot staging server"
  sudo certbot --nginx -d $DOMAIN --agree-tos --staging --register-unsafely-without-email --no-redirect
fi
