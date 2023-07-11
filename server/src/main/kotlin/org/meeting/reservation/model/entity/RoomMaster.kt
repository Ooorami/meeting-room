package org.meeting.reservation.model.entity

import javax.persistence.*

@Entity(name = "ROOM_M")
class RoomMaster(
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int? = null,

    @Column(name = "ROOM_CD", nullable = false)
    var roomCd: Int,

    @Column(name = "ROOM_NM", length = 10, nullable = false)
    var roomNm: String
) {
}
