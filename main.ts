import { parse } from 'https://deno.land/std@0.184.0/flags/mod.ts';
import { join } from 'https://deno.land/std@0.184.0/path/mod.ts';
import { help } from './help.ts'

const flags = parse(Deno.args, {
  boolean: ['get', 'help',],
  string: ['set', 'trigger', 'brightness', 'delay_on', 'delay_off'],
  collect: ['set'],
  alias: {
    trigger: 't',
    brightness: 'b',
    delay_on: 'h',
    delay_off: 'l',
    help: '?'
  }
});

// console.debug(flags)

if (Deno.args.length === 0) flags.help = true
if (flags.help) help()

const LED_PATH = '/sys/class/leds'

const leds = []
for await (const dirEntry of Deno.readDir(LED_PATH)) leds.push(dirEntry.name)

const get = (name: string, attr: string) => Deno.readTextFileSync(join(LED_PATH, name, attr)).trim()
const set = (name: string, attr: string, value: string) => Deno.writeTextFileSync(join(LED_PATH, name, attr), value)

if (flags.set.length > 0) {
  for (let name of flags.set) {

    if (!Object.keys(leds).includes(name) && !leds.includes(name) || name === '') {
      console.error('Invalid command, try --help')
      Deno.exit(1)
    }

    if (isFinite(<unknown>name as number)) {
      name = leds[+name]
    }
    
    try {
      if (flags.trigger) set(name, 'trigger', flags.trigger)
      if (flags.brightness) set(name, 'brightness', flags.brightness)
      if (flags.delay_on) set(name, 'delay_on', flags.delay_on)
      if (flags.delay_off) set(name, 'delay_off', flags.delay_off)
    } catch {
      // TODO: Handle abused flags
      console.error('Invalid command, try --help')
      Deno.exit(1)
    }
  }
}

if (flags.get) {
  const table = []
  for await (const name of leds) {
    const trigger = get(name, 'trigger')!.match(/\[(.*)\]/)![1]
    const brightness = +get(name, 'brightness')
    const max_brightness = +get(name, 'max_brightness')
    const delay_on = trigger == 'timer' ? +get(name, 'delay_on') : NaN
    const delay_off = trigger == 'timer' ? +get(name, 'delay_off') : NaN
    table.push({ name, trigger, brightness, max_brightness, delay_on, delay_off })
  }
  console.table(table); 
}
