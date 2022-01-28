#!/bin/bash

main() {
  echo -e "\nRunning Signal binary setup\n"

  if [[ "$OSTYPE" == "darwin"* ]]; then
    setup_mac $@
    echo -e "\nDone\n"
    exit 0

  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    setup_linux $@
    echo -e "\nDone\n"
    exit 0

  else
    echo -e "\nUnsupported OS, exiting...\n"
    exit 1
  fi
}

setup_mac() {
  USERNAME=$(id -P $(stat -f%Su /dev/console) | cut -d : -f 8)
  # SCRIPT_PATH="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && cd ../ && pwd )"

  echo -e "Superuser \033[1mpassword\033[0m?"
  read -s SUPER_PASS
  
  if [[ $(dscl . -authonly $USERNAME "$SUPER_PASS") != "" ]]; then
    setup_mac "$@"
    return 0
  fi

  # echo -e "$SUPER_PASS\n" | sudo -S chown -R $USERNAME:admin /usr/local/bin
  echo -e "$SUPER_PASS\n" | sudo -S echo "\
#!/bin/bash

main() {

  PWD=$(pwd)

  # TODO: (1) detect if 'signal' file exists
  # TODO: (2) detect if 'signal' file is bash or node

  if [[ ! -f "$PWD/signal" ]]; then
    echo 'No 'signal' file to execute, exitting...'
    return 0
  fi

  ./signal \"\$@\"

}

main \"\$@\"
  " > /usr/local/bin/signal
  # echo -e "$SUPER_PASS\n" | sudo -S chown $USERNAME:admin /usr/local/bin/signal
  # echo -e "$SUPER_PASS\n" | sudo -S chmod 755 /usr/local/bin/signal

  return 0
}

setup_linux() {
  $USERNAME=$(whoami)
  # SCRIPT_PATH="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && cd ../ && pwd )"

  if [[ ! -d "/usr/local/bin" ]]; then
    echo "Error, '/usr/local/bin directory' must exist and be added to the PATH env var, exitting script..."
    return 0
  fi

  echo -e "Superuser \033[1mpassword\033[0m?"
  read -s SUPER_PASS

  echo "TODO: Test Linux Super Pass"
  return 0

  echo -e "$SUPER_PASS\n" | sudo -S echo "
#!/bin/bash

OK
  " > /usr/local/bin/signal
  echo -e "$SUPER_PASS\n" | sudo -S chown root:root /usr/local/bin/signal
  echo -e "$SUPER_PASS\n" | sudo -S chmod 755 /usr/local/bin/signal

  return 0
}

main "$@"
