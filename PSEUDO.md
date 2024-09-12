# Elevator logic

(3) main entities:

- floor interface
- unit interface
- unit processor

Plus, (1) entity for multiple floors:

- link unit interface

## Floor Interface

- exists on each floor
- only `up` button for bottom floor
- only `down` button for top floor
- both `up` and `down` for floors inbetween

## Unit Interface

- exists in each unit
- a button for each floor
- optional `user id` interface

## Unit Processor

- Process up and down movement
- Process door open and close
- Safety measures

## Link Unit Interface

- Listens events from floor interface
- Calculate most efficient unit to get to the floor
