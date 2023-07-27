export const TIME = {
    HOUR: {
        NINE: {label: "오전 9시", value: 9},
        TEN: {label: "오전 10시", value: 10},
        ELEVEN: {label: "오전 11시", value: 11},
        TWELVE: {label: "오후 12시", value: 12},
        ONE: {label: "오후 1시", value: 13},
        TWO: {label: "오후 2시", value: 14},
        THREE: {label: "오후 3시", value: 15},
        FOUR: {label: "오후 4시", value: 16},
        FIVE: {label: "오후 5시", value: 17},
        SIX: {label: "오후 6시", value: 18},
    },
    MINUTE: {
        ZERO: {label: "00분", value: 0},
        TEN: {label: "10분", value: 10},
        TWENTY: {label: "20분", value: 20},
        THIRTY: {label: "30분", value: 30},
        FORTY: {label: "40분", value: 40},
        FIFTY: {label: "50분", value: 50},
    },
};

export const convertTimeToMinutes = (hourLabel, minuteLabel) => {
    const selectedHour = Object.values(TIME.HOUR).find(item => item.label === hourLabel);
    const selectedMinute = Object.values(TIME.MINUTE).find(item => item.label === minuteLabel);

    if (!selectedHour || !selectedMinute) {
        // 선택한 시간 또는 분이 잘못된 경우 에러 처리
        return null;
    }

    const hourValue = selectedHour.value;
    const minuteValue = selectedMinute.value;

    return hourValue * 60 + minuteValue;
};

export const convertTimeToMinutesReservatonList = (timeLabel) => {

    const regex = /(오전|오후)\s*(\d+)시\s*(\d+)분/; // 정규식을 사용하여 시간과 분 추출
    const matches = timeLabel.match(regex);

    if (!matches) {
        // 시간 형식이 맞지 않는 경우 에러 처리
        return null;
    }

    const period = matches[1]; // "오전" 또는 "오후"
    let hour = parseInt(matches[2]); // 숫자형으로 변환된 시간
    const minute = parseInt(matches[3]); // 숫자형으로 변환된 분

    if (period === "오후" && hour < 12) {
        hour += 12;
    }

    return hour * 60 + minute;
};