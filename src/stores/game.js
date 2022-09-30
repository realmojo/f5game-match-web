import { observable, runInAction } from "mobx";
import { levels } from "../lib";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IMAGE_0 from "../assets/images/0.png";
import IMAGE_1 from "../assets/images/1.png";
import IMAGE_2 from "../assets/images/2.png";
import IMAGE_3 from "../assets/images/3.png";
import IMAGE_4 from "../assets/images/4.png";
import IMAGE_5 from "../assets/images/5.png";
import IMAGE_6 from "../assets/images/6.png";
import IMAGE_7 from "../assets/images/7.png";
import IMAGE_8 from "../assets/images/8.png";
import IMAGE_9 from "../assets/images/9.png";
import IMAGE_10 from "../assets/images/10.png";
import IMAGE_11 from "../assets/images/11.png";
import IMAGE_12 from "../assets/images/12.png";
import IMAGE_13 from "../assets/images/13.png";
import IMAGE_14 from "../assets/images/14.png";
import IMAGE_15 from "../assets/images/15.png";
import IMAGE_16 from "../assets/images/16.png";
import IMAGE_17 from "../assets/images/17.png";
import IMAGE_18 from "../assets/images/18.png";
import IMAGE_19 from "../assets/images/19.png";
import IMAGE_20 from "../assets/images/20.png";
import IMAGE_21 from "../assets/images/21.png";
import IMAGE_22 from "../assets/images/22.png";
import IMAGE_23 from "../assets/images/23.png";
import IMAGE_24 from "../assets/images/24.png";

const loadImage = [
  IMAGE_0,
  IMAGE_1,
  IMAGE_2,
  IMAGE_3,
  IMAGE_4,
  IMAGE_5,
  IMAGE_6,
  IMAGE_7,
  IMAGE_8,
  IMAGE_9,
  IMAGE_10,
  IMAGE_11,
  IMAGE_12,
  IMAGE_13,
  IMAGE_14,
  IMAGE_15,
  IMAGE_16,
  IMAGE_17,
  IMAGE_18,
  IMAGE_19,
  IMAGE_20,
  IMAGE_21,
  IMAGE_22,
  IMAGE_23,
  IMAGE_24,
];

const doGetLevel = () => {
  // return new Promise(async (resolve) => {
  //   const level = await AsyncStorage.getItem("level");
  //   resolve(level ? Number(level) : 1);
  // });
  return 44;
};

const doGetScore = () => {
  return new Promise(async (resolve) => {
    const score = await AsyncStorage.getItem("score");
    resolve(score ? JSON.parse(score) : []);
  });
};

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getRandomNumber = (min, max) => {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
};

const getImage = (items) => {
  let imageItems = [];
  const len = items.length / 2;
  while (imageItems.length !== len) {
    const randomNumber = getRandomNumber(0, 25);
    if (!imageItems.includes(randomNumber)) {
      imageItems.push(randomNumber);
    }
  }

  return imageItems;
};

const game = observable({
  items: [],
  row: 0,
  col: 0,
  times: 0,
  isVibration: true,
  getLevel: async () => {
    const level = await doGetLevel();
    return level ? level : 1;
  },
  getStage: async () => {
    const level = await doGetLevel();
    return levels[level - 1];
  },
  async setLevel(level) {
    await AsyncStorage.setItem("level", `${level}`);
  },
  setActive(key, active) {
    this.items[key].active = active;
  },
  setVibration() {
    this.isVibration = !this.isVibration;
  },
  setActiveClose() {
    for (const i in this.items) {
      this.items[i].active = false;
    }
  },
  setNumber(key, number) {
    this.items[key].number = number;
  },
  setItems(level) {
    let t = [];
    const stage = levels[level - 1];
    this.row = stage.row;
    this.col = stage.col;
    const len = stage.row * stage.col;
    for (let i = 0; i < len; i += 1) {
      t.push({
        id: i,
        // image: require("../assets/favicon.png"),
        image: "",
        active: false,
        number: 0,
      });
    }
    this.items = t;
  },
  async setImageAndShuffle() {
    const level = await doGetLevel();
    this.setItems(level);
    runInAction(() => {
      const randomImageItems = getImage(this.items);
      const length = this.items.length;
      let j = 0;
      for (let i = 0; i < length; i++) {
        this.items[i].image = loadImage[randomImageItems[j]];
        this.setNumber(i, randomImageItems[j]);
        this.items[i].active = true;
        j++;
        if (randomImageItems.length - 1 === i) {
          j = 0;
        }
      }
      this.items = shuffle(this.items);
    });
  },
  getItems() {
    this.setImageAndShuffle();
    return this.items;
  },
  isClear() {
    const e = this.items.filter((item) => item.active === false);
    return e.length === 0 ? true : false;
  },
  async initScore() {
    await AsyncStorage.setItem("score", JSON.stringify([]));
  },
  async setScore(level, time) {
    let score = await doGetScore();
    score.push({
      level,
      time,
    });
    await AsyncStorage.setItem("score", JSON.stringify(score));
  },
  async getScore() {
    const score = await doGetScore();
    return score;
  },
});

export default game;
