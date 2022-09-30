import React, { useState, useLayoutEffect } from "react";
import "./Game.css";
import { PageHeader } from "antd";
import { observer } from "mobx-react";
import stores from "../stores";
import styled from "styled-components";
console.log(window.innerWidth);
const MAX_WIDTH = window.innerWidth > 500 ? 500 : window.innerWidth;
const containerPadding = 10;
const tilePadding = 3;

const Container = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${containerPadding}px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Tile = styled.div`
  width: 25%;
  display: inline-block;
  padding: ${tilePadding}px;
`;

const InnerTile = styled.div`
  height: 100%;
  border-radius: 2px;
  width: 100%;
  border: 1px solid #aaa;
  background: #293244;
`;

const TileImage = styled.div`
  background-size: cover;
  background: #293244;
  opacity: 0;
`;

export const Game = observer(() => {
  const [isClick, setIsClick] = useState(false);
  const [gameLevel, setGameLevel] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState(3);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [prevItems, setPrevNumber] = useState({
    key: null,
    number: null,
  });

  const { items, row } = stores.game;
  const column = row;
  // const tileWidthPercent = items.length === 4 ? "50%" : "25%";
  const tileWidth =
    (MAX_WIDTH - containerPadding * 2 - tilePadding * 2) / column;
  const tileHeight = tileWidth;

  useLayoutEffect(() => {
    if (isStart) {
      setIsStart(false);
      setGameInit();
      async function getStorage() {
        const level = await stores.game.getLevel();
        setGameLevel(level);
      }
      getStorage();

      setTimeout(() => {
        stores.game.setActiveClose();
      }, 3000);
    }

    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
        setTime(time + 1);
      }, 1000);

    setCurrentTimer(timer);

    if (!isStart && counter === 0) {
      doGameOver();
      setTimeout(() => {
        console.log("game over");
        // setGameOverModalButtonVisible(true);
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [counter]);
  // }, []);

  const doSelect = async (key, item) => {
    console.log(isClick, item.active);
    if (isClick || item.active) {
      return;
    }
    if (prevItems.key === null) {
      setPrevNumber({
        key: key,
        number: item.number,
      });
      stores.game.setActive(key, true);
      return;
    }

    if (prevItems.number === item.number) {
      stores.game.setActive(key, true);
    } else {
      setIsClick(true);
      stores.game.setActive(key, true);

      if (stores.game.isVibration) {
        window.navigator.vibrate(300);
      }

      setTimeout(() => {
        stores.game.setActive(prevItems.key, false);
        stores.game.setActive(key, false);
        setIsClick(false);
      }, 500);
    }
    setPrevNumber({
      key: null,
      number: null,
    });

    if (stores.game.isClear()) {
      const level = await stores.game.getLevel();
      stores.game.setLevel(Number(level) + 1);
      // setGameClearModalVisible(true);
      stores.game.setScore(gameLevel, time);
      clearInterval(currentTimer);
      // setTimeout(() => {
      //   setGameClearModalButtonVisible(true);
      // }, 2000);
    }
  };

  const setGameInit = async () => {
    stores.game.setImageAndShuffle();
    const stage = await stores.game.getStage();
    setCounter(stage.time);
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={`LEVEL ${gameLevel + 1}`}
      ></PageHeader>

      <div className="board-container">
        <Container>
          {items.map((item, key) => {
            return (
              <Tile
                style={{ height: tileHeight, width: tileWidth }}
                key={item.id}
              >
                <InnerTile onClick={() => doSelect(key, item)}>
                  <TileImage
                    style={{
                      height: tileHeight - 8,
                      width: tileWidth - 8,
                      backgroundImage: `url(${item.image})`,
                      opacity: item.active ? 1 : 0,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    // style={item.active ? { opacity: 1 } : { opacity: 0 }}
                  ></TileImage>
                </InnerTile>
              </Tile>
            );
          })}
        </Container>
      </div>
    </div>
  );
});