const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['messi', 'ronaldo', 'mbappe', 'kroos', 'kane', 'modric', 'donnaruma', 'pickford', 'bellingham', 'vinicius', 'rooney', 'beckham', 'khvicha', 'griezmann', 'nababkin'];
const DESCRIPTIONS = ['#отпуск', '#работа', '#спорт', 'На прогулке', 'в музее', 'семья', 'выходные', '#море', 'на даче', '#горы'];

//генератор массива целых числе по возрастанию:
const generateArray = (minValue, maxValue) => {
  const newArray = [];
  for (let i = 0; i <= maxValue - minValue; i++) {
    newArray[i] = i + minValue;
  }
  return newArray;
};

//массивы из условий задачи:
const idArray = generateArray(1, 25);
const likesArray = generateArray(15, 200);
const commentsArray = generateArray (0, 30);
const commentsIDArray = generateArray(1, 9999);
const avatarsArray = generateArray(1, 5);

//генератор случайного целого числа:
const getRandomInteger = (minNum, maxNum) => {
  const lower = Math.ceil(Math.min(minNum, maxNum));
  const upper = Math.floor(Math.max(minNum, maxNum));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//генератор случайного элемента в массиве:
const getRandomArrayElement = (array) => {
  const previousValues = [];
  return function () {
    let currentElement = array[getRandomInteger(0, array.length - 1)];
    while (previousValues.includes(currentElement)) {
      currentElement = getRandomInteger(0, array.length - 1);
    }
    if (array.length >= 25) {
      previousValues.push(currentElement);
    } //уникальные элементы нужны только, если массив >= 25

    return currentElement;
  };
};

//переменные для вызова функции с замыканием
const generateRandomID = getRandomArrayElement(idArray);
const generateRandomPhotoID = getRandomArrayElement(idArray);
const generateDescription = getRandomArrayElement(DESCRIPTIONS);
const generateLikesNum = getRandomArrayElement(likesArray);
const generateCommentsNum = getRandomArrayElement(commentsArray);
const generateCommentsID = getRandomArrayElement(commentsIDArray);
const generateAvatarsNum = getRandomArrayElement(avatarsArray);
const generateMessageText = getRandomArrayElement(MESSAGES);
const generateName = getRandomArrayElement(NAMES);

//генератор текста комментария
const getRandomCommentMessage = () => {
  const sentenceNumber = getRandomInteger(1, 2);
  const firstSentence = generateMessageText();
  if (sentenceNumber === 2) {
    let secondSentence = generateMessageText();
    while (secondSentence === firstSentence) {
      secondSentence = generateMessageText();
    }
    return `${firstSentence} ${secondSentence}`;
  } else {
    return firstSentence;
  }
};

//генератор объекта комментария
const createComment = function() {
  return {
    id: generateCommentsID(),
    avatar: `img/avatar-${ generateAvatarsNum() }.svg`,
    message: getRandomCommentMessage(),
    name: generateName()
  };

};
//генератор объекта фото
const createNewPhoto = function() {

  return {
    id: generateRandomID(),
    url: `photos/${ generateRandomPhotoID() }.jpg`,
    description: generateDescription(),
    likes: generateLikesNum(),
    comments: Array.from({length: generateCommentsNum()}, createComment)
  };
};

const arrayPhotos = Array.from({length: 25}, createNewPhoto);

console.log(arrayPhotos);
