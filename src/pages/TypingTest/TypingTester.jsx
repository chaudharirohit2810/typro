import React from "react";

class TypingTester extends React.Component {
  constructor(props) {
    super(props);
    const paragraph =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    this.state = {
      paragraph: paragraph,
      speed: null,
      accurate: null,
      time: 60,
      index: 0,
      typed: "",
      start: 0,
      accuracy: [],
      over: false,
      profile: {
        name: {
          first_name: null,
          last_name: null,
        },
      },
    };
  }
  resetState = () => {
    clearInterval();
    const paragraph =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    this.setState({
      paragraph: paragraph,
      speed: 60,
      accurate: 100,
      time: 60,
      index: 0,
      typed: "",
      start: 0,
      accuracy: [],
      over: false,
    });
  };
  calculateSpeed = () => {
    let netSpeed = this.state.speed;
    let count = 0;
    const accuracy = this.state.accuracy.slice();
    for (let i = 0; i < accuracy.length; i++) {
      count += !accuracy[i];
    }
    netSpeed -= count;
    return netSpeed < 0 ? 0 : netSpeed;
  };

  componentDidMount() {
    //add event listener to handle the keystrokes
    document.addEventListener("keydown", (event) => {
      //do nothing if the time is over
      if (this.state.over) {
        return;
      }
      //first time the user hits the key the timer starts automatically

      if (!this.state.start) {
        this.setState({ start: 1 });
        let x = setInterval(() => {
          this.setState({ time: this.state.time - 1 });
          if (!this.state.time) {
            this.setState({ over: true });
            clearInterval(x);
          } else return 0;
        }, 1000);
        this.setState({ start: x });
      }
      //try to manipulate the state using the keystroke
      const key = String(event.key);
      switch (key) {
        case "Shift":
          return;
        case "Backspace":
          let typed = this.state.typed.slice();
          if (typed.length) {
            let index = this.state.index;
            index = index - 1;
            let accuracy = this.state.accuracy;
            accuracy.pop();
            typed = Array.from(typed);
            // //console.log(typed);
            // return;
            typed.pop();
            typed = typed.join("");
            //console.log(typed);

            // return;

            this.setState({
              index: index,
              typed: typed,
              accuracy: accuracy,
            });
          }
          return;
        case "Alt":
          return;
        default:
          break;
      }
      let paragraph = this.state.paragraph.slice();
      let typed = this.state.typed.slice();
      let index = this.state.index;
      let accuracy = this.state.accuracy.slice();
      let count = 0;
      for (let i = 0; i < accuracy.length; i++) {
        if (accuracy[i] === false) count++;
      }
      // console.log(count);
      // return;
      let accurate = ((typed.length - count) / typed.length) * 100;
      accurate = Number.parseInt(accurate);

      if (key === paragraph[index]) {
        typed += paragraph[index];
        accuracy.push(true);
      } else {
        accuracy.push(false);
        typed += paragraph[index];
      }
      index++;
      let speed = (typed.length / (60 - this.state.time)) * 12;
      speed = Number.parseInt(speed);
      this.setState({
        paragraph: paragraph,
        typed: typed,
        index: index,
        speed: speed,
        accuracy: accuracy,
        accurate: accurate,
      });
      // //console.log(this.state);
    });
  }
  componentWillUnmount() {
    clearInterval();
  }
  createTypedPart = () => {
    let accuracy = this.state.accuracy.slice();
    let para = accuracy.map((val, index) => {
      let typed = this.state.typed.slice();
      return (
        <span key={index} className={val ? "right" : "wrong"}>
          {typed[index]}
        </span>
      );
    });
    //console.log(para);
    return para;
  };

  render() {
    return (
      <React.Fragment>
        <div className="row my-5">
          <div className="col">
            <div className="box">
              <div className="head">
                <div className="row">
                  <div className="col">
                    <p>Speed : {this.calculateSpeed()}</p>
                  </div>
                  <div className="col">
                    <p>Accuracy : {this.state.accurate}%</p>
                  </div>
                  <div className="col">
                    <p>Time : {this.state.time}s</p>
                  </div>
                </div>
              </div>
              <p className="h4 scroll border">
                <span>{this.createTypedPart()}</span>
                {this.state.paragraph.slice(
                  this.state.index,
                  this.state.paragraph.length
                )}
              </p>
              <div className="bottom">
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-md btns"
                      onClick={() => this.resetState()}
                    >
                      Start
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-md btns"
                      onClick={() => this.resetState()}
                    >
                      Restart
                    </button>
                  </div>
                </div>
              </div>
              {this.state.over ? <Analysis detail={this.state} /> : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Analysis extends React.Component {
  render() {
    return (
      <React.Fragment>
        <hr />
        <span className="specialComment">{this.getSpeedQuality()}</span>
        <hr />
        <h3 className="impHeading">Stats</h3>
        <div className="row centerAll">
          <span className="col m-2 block">
            Raw Speed : {this.props.detail.speed}
          </span>
          <span className="col m-2 block">
            Net Speed :{" "}
            {this.props.detail.speed -
              Number.parseInt((100 - this.props.detail.accurate) / 5)}
          </span>
        </div>
        <div className="row centerAll">
          <span className="col m-2 block">
            Speed(KPM) : {this.props.detail.typed.length}KPM
          </span>
          <span className="col m-2 block">
            Characters Missed : {this.generateMissed()}
          </span>
        </div>

        <div className="row centerAll">
          <span className="col m-2 block">
            Complete Words : {this.completeWords()}
          </span>
          <span className="col m-2 block">
            Characters Missed : {this.generateMissed()}
          </span>
        </div>
      </React.Fragment>
    );
  }
  getSpeedQuality = () => {
    if (!this.props.detail.over) return null;
    const speed = this.props.detail.speed;
    if (speed < 30) {
      return (
        <React.Fragment>
          <b className="info">Beginner</b> : Your Speed is quite slow, Practice
          more and you will surely Improve!
        </React.Fragment>
      );
    } else if (speed <= 60) {
      return (
        <React.Fragment>
          <b className="info">Intermidiate</b> : Your Speed is Good, Consider
          improving a little!
        </React.Fragment>
      );
    } else if (speed >= 60) {
      return (
        <React.Fragment>
          <b className="info">Advanced</b> : Your Speed is Fast!
        </React.Fragment>
      );
    } else if (speed >= 90) {
      return (
        <React.Fragment>
          <b className="info">Expert</b> : You are Pro Typist!
        </React.Fragment>
      );
    }
  };
  completeWords = () => {
    const typed = this.props.detail.typed.slice();
    let count = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] == " ") count++;
    }
    return count;
  };
  generateMissed = () => {
    let m = new Map();
    // m.set('c', 9);
    // m.set('c', m.get('c') ? m.get('c') + 1 : 1);
    const accuracy = this.props.detail.accuracy.slice();
    for (let i = 0; i < accuracy.length; i++) {
      if (!accuracy[i]) {
        m.set(
          this.props.detail.typed[i],
          m.get(this.props.detail.typed[i])
            ? m.get(this.props.detail.typed[i]) + 1
            : 1
        );
      }
    }
    let ans = [];
    let j = 0;
    for (let i of m) {
      let k;
      if (!j) {
        j++;
        k = (
          <span key={i}>
            {i[0]} : {i[1]}
          </span>
        );
      }
      k = (
        <span key={i}>
          {i[0]} : {i[1]},{" "}
        </span>
      );
      ans.push(k);
    }
    return ans;
  };
}
export default TypingTester;
