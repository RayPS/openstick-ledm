export function help () {
  console.log('ledm v0.1');
  console.log('Usage:');
  console.log('\t--help\t-?');
  console.log();
  console.log('\t--get');
  console.log();
  console.log('\t--set=<name|index> --<attribute>=<value> ...');
  console.log();
  console.log('\tAttribute flags:');
  console.log('\t\t--trigger\t-t');
  console.log('\t\t--brightness\t-b');
  console.log('\t\t--delay_on\t-h');
  console.log('\t\t--delay_off\t-l');
  console.log();
  console.log('Examples:');
  console.log('\t--get');
  console.log('\t--set green:internet --trigger none');
  console.log('\t--set green:internet --brightness 1');
  console.log();
  console.log('\t--set 0 --set 1 --set 5 -t none -b 1 --get');
  console.log('\t--set 0 -t timer -h 100 -l 500 --get');
}