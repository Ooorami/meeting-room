## DB Table 스펙

---

### ROOM_M(회의실 테이블)

| ROOM_CD | ROOM_NM     | 
|---------|-------------| 
| 회의실 코드  | 회의실 이름      | 
| INT     | VARCHAR(10) |

### RESERVATION_L(예약 기록)

| ROOM_CD | RESERVATION_DT | RESERVATION_CHECKER | START_TM    | END_TM      | RESERVATION_TM | TOPIC       | PARTICIPANT  | USE_YN     |
|---------|----------------|---------------------|-------------|-------------|----------------|-------------|--------------|------------|
| 회의실 코드  | 예약일자(yyyymmdd) | 사원명(예약자)            | 예약 시작시간     | 예약 종료시간     | 예약시간           | 회의 주제       | 참여자          | 사용여부       | 
| INT     | VARCHAR(8)     | VARCHAR(10)         | VARCHAR(20) | VARCHAR(20) | VARCHAR(20)    | VARCHAR(20) | VARCHAR(100) | VARCHAR(1) |
