CREATE TABLE ROOM_M
(
    ROOM_CD VARCHAR(10) NOT NULL,
    ROOM_NM VARCHAR(10) NOT NULL,

    CONSTRAINT ROOM_M_PK PRIMARY KEY (
                                    ROOM_CD
        )
)

CREATE TABLE RESERVATION_L
(
    ROOM_CD             VARCHAR(10) NOT NULL,
    RESERVATION_DT      VARCHAR(8)  NOT NULL,
    RESERVATION_CHECKER VARCHAR(10) NOT NULL,
    START_TM            VARCHAR(20) NOT NULL,
    END_TM              VARCHAR(20) NOT NULL,
    RESERVATION_TM      VARCHAR(20) NULL,
    TOPIC               VARCHAR(20) NULL,
    PARTICIPANT         VARCHAR(100) NULL,
    USE_UN              VARCHAR(1)  NOT NULL,

    CONSTRAINT RESERVATION_L_PK PRIMARY KEY (
                                            ROOM_CD,
                                            RESERVATION_DT,
                                            RESERVATION_CHECKER,
                                            START_TM
        )
)


--* 테이블 정의서
-- 회의실 T : 회의실 이름, 회의실 코드
-- 예약 T : 회의실 코드, 시작 시간, 종료시간, 예약 시간, 사원 이름, 회의 주제, 참여자, (회의실) 사용 여부
