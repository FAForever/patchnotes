# Patch TBD

## Land Scounts

land scouts prioritize radar structures over mobile units and remove their PD/static AA target priority.

## Fire Beetle

Beetles' cloak consume 10 Energy per second. Beetles were previously the only cloaked unit without an energy upkeep, which allowed players to rush them at the early T2 stage with both low build and upkeep costs. Since the unit is already very strong, this exception was not necessary. Adding a 10 E/s drain brings Beetles in line with other cloaked units and tones down their early rush potential while still preserving their identity.

- Fire Beetle: T2 Mobile Bomb (XRL0302):
- Energy consumption: 0 -> 10

## sera Lighting tank
Remove the Seraphim Lightning Tank's FiringTolerance, as it could have caused the unit to miss aircraft. Functionally, the unit remains unchanged.

Lightning Projector (anti-air)
- FiringTolerance: 2 --> 0


## Megathish

Extend build range by +1 so that eggs can be more easily placed far enough away so that the Megalith doesn't have to walk due to the egg being placed within its footprint.
Add repair capability to the Megalith so it can finish unfinished eggs.
Add reclaim capability to make it more clear that it can reclaim. Previously it could only reclaim by building an egg on top of wrecks.
Add pause capability as is standard with engineering units.
Update the T3 Mobile Arty and T3 Mobile Anti-Air crab eggs stats to reflect previous balance changes to those units.






## Strat Bombers

Improve the maneuverability and reliability of Strategic Bombers to promote proactive use of them and as a competing option to T3 gunships. Lets strats micro to more effectively avoid flak damage and leaves less opportunities for ASF/SAMs to deal damage.Complements the new turn speed by improving how quickly strats lift off and navigate up/down terrain. Greatly improves the reliability of bomb drops on uneven terrain or during turns. This is similar to what was done for the Ahwassa in #2465. As a side effect, this usually makes the bomb drop from further away, so ACUs will have an easier time dodging bombs. Dodging was made more difficult with the strat elevation reduction in #4799, so this counteracts that change. This only affects bombers automatically attacking from an idle state or from an attack, attack move, or patrol order. Previously strats would drop bombs every ~13 seconds, and now they drop every ~10 seconds. Strats will no longer automatically fly off to attack very distant targets. The 64 range matches strats' radar range. Reduce the veterancy requirement for Strategic Bombers to match their mass cost reductions in previous patches.

- Turn speed: 0.8 -> 1.2
- Lift Factor: 7 -> 10
- Bomb drop threshold: 3.5 -> 8
- BreakOffDistance: 60 -> 50
- RandomBreakOffDistanceMult: 1.5 -> 1
- Auto-attack range: 90 -> 64
- Mass killed required per veterancy level: 4200 -> 2x of own mass cost (3500)



## Novax Center

Automatically start rebuilding the Novax Satellite at the base station if the satellite is destroyed by artillery fire, nuclear missiles, or any other means.

- Satalite rebuild : false >  true

## Salem

Decrease Salem's anti-torpedo flares' target check interval from 1.0s to 0.4s (the default for anti-projectile weapons). This makes it more likely to detect torpedoes and fire the flares correctly, especially against torpedo bombers.

Anti Torpedo Solution
- Target Check Interval: 1.0s -> 0.4s


## TML Enchacement (Sera/UEF)

(#6934) Increase build time for ACU TMLs so that they are less effective on the move, in combat, and from the water. You can still reach a high fire rate with engineer assistance.

- TML Missile build time: 450 -> 700 (same as SACU)
- Build time with T2 suite: 10.8 -> 16.7 seconds
- Build time with T3 suite: 4.5 -> 7.0 seconds

Increase minimum range of ACU TMLs so that they are less powerful in ACU vs ACU fights.

sera

- Minimum range: 15 -> 30

uef

- Minimum range: 15 -> 30


The minimum range for Billy nuke has to be increased so that the TML's minimum range ring is visible.

----------------------------------------------------
## Cybran HQs 

(#6936) Adjust HP of T2 Air/Land HQs so that Cybran T2 HQs do not die to 1 TML hit. This prevents Cybran players from being unfairly locked out of the tech needed to counter TMLs.
 