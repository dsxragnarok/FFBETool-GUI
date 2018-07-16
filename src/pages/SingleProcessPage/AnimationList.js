import React from 'react';
import List, { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default function AnimationList ({
  animations,
  removedAnimations,
  addAnim,
  removeAnim
}) {
  return (
    <List>
    { animations.map((anim, index) =>
      <ListItem
        key={`${index}-${anim}`}
        leftCheckbox={
          removedAnimations.includes(anim) ?
          <Checkbox checked={false} onCheck={() => addAnim(anim)} /> :
          <Checkbox checked={true} onCheck={() => removeAnim(anim)} />
        }
      >
        {anim}
      </ListItem>
    ) }
    </List>
  );
}
