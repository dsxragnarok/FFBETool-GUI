#### Reducers
```javascript
Units: {
  [id]: {
    id: number,
    animations: arrayOf(strings) // key to animation sheet, json and gif,
    name: string
}

AnimSheets: {
  [action_unitId]: pathToFile | data-uri?
}

AnimGifs: {
  [action_unitId]: pathToFile
}

AnimJson: {
  [action_unitId]: object
}
```

#### File Object
```
File: {
  lastModified : number,
  lastModifiedDate : Date,
  name: string,
  path: string,
  preview: string,
  size: number,
  type: string,
  webkitRelativePath: string
}

File: {
  lastModified : 1507666290000,
  lastModifiedDate : Tue Oct 10 2017 14:11:30 GMT-0600 (MDT),
  name: 'unit_anime_253001205',
  path: '/Users/kevin.phung/Share/ffbe-2.3.1-units-extracted/unit_anime_253001205.png',
  preview: 'blob:http://localhost:3000/616351f0-27bc-42d3-b6fd-fdd9f4f28d06',
  size: 56324,
  type: 'image/png',
  webkitRelativePath: ''
}
```
