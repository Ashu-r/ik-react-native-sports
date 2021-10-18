const getDrillIcon = drill => {
  switch (drill) {
    case 'soccer':
      return 'soccer';
    case 'agility':
      return 'fire';
    case 'cognitive':
      return 'brain';
    default:
      return drill;
  }
};

export default getDrillIcon;
