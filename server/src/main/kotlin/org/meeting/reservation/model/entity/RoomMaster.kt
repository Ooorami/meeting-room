package org.meeting.reservation.model.entity

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Embeddable
import javax.persistence.EmbeddedId
import javax.persistence.Entity

@Entity(name = "ROOM_M")
class RoomMaster(
    @EmbeddedId
    var key: Key,

    @Column(name = "ROOM_NM", length = 10, nullable = false)
    var roomNm: String
) {
    @Embeddable
    data class Key(
        @Column(name = "ROOM_CD", nullable = false)
        var roomCd: Int
    ): Serializable
}
