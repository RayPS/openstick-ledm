# ledm
### A led manager for openstick
> **Note**
> This is a prototype that may be rewritten in another language in the future.

![screenshot](Screenshot%202023-04-24%20at%2021.31.45@2x.png)

## Installation
```
wget https://github.com/RayPS/openstick-ledm/raw/main/ledm.tar.gz
tar -xzv -C /usr/local/bin
rm ledm.tar.gz
```
## Usage
```
Usage:
        --help  -?

        --get

        --set=<name|index> --<attribute>=<value> ...

        Attribute flags:
                --trigger       -t
                --brightness    -b
                --delay_on      -h
                --delay_off     -l

Examples:
        --get
        --set green:internet --trigger none
        --set green:internet --brightness 1

        --set 0 --set 1 --set 5 -t none -b 1 --get
        --set 0 -t timer -h 100 -l 500 --get
```
## Compile 
```
deno compile --unstable --allow-write --allow-read -o ledm main.ts
```