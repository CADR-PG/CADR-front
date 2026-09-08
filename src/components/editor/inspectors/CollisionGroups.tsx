import { Button } from '@mui/material';

function dec2bin(dec: number) {
  return (dec >>> 0).toString(2);
}

interface CollisionGroupsComponent {
  collisionGroups: number;
}

interface CollisionGroupsProps<T extends CollisionGroupsComponent> {
  groups: number;
  componentWrite: T;
}

export default function CollisionGroups<T extends CollisionGroupsComponent>({
  groups,
  componentWrite,
}: CollisionGroupsProps<T>) {
  const handleClick = (index: number, collider: boolean) => {
    const i = collider ? index + 16 : index;
    const bit = Math.pow(2, i);
    componentWrite.collisionGroups ^= bit;
  };

  return (
    <div>
      <div className="collision-groups">
        {dec2bin((groups & 0b111111110000000000000000) >> 16)
          .padStart(8, '0')
          .split('')
          .reverse()
          .map((value) => (value === '1' ? true : false))
          .map((value, index) => (
            <Button
              className="collision-child"
              disableRipple
              variant="contained"
              color={value ? 'secondary' : 'primary'}
              onClick={() => {
                handleClick(index, true);
              }}
              key={index}
            >
              {index}
            </Button>
          ))}
      </div>
      <hr />
      <div className="collision-groups">
        {dec2bin(groups & 0b11111111)
          .padStart(8, '0')
          .split('')
          .reverse()
          .map((value) => (value === '1' ? true : false))
          .map((value, index) => (
            <Button
              className="collision-child"
              disableRipple
              variant="contained"
              color={value ? 'secondary' : 'primary'}
              onClick={() => {
                handleClick(index, false);
              }}
              key={index}
            >
              {index}
            </Button>
          ))}
      </div>
    </div>
  );
}
