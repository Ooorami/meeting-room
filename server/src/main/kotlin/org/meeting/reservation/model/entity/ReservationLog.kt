package org.meeting.reservation.model.entity

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Embeddable
import javax.persistence.EmbeddedId
import javax.persistence.Entity

@Entity(name = "RESERVATION_L")
class ReservationLog(
    @EmbeddedId
    var key: Key,

    @Column(name = "END_TM", length = 20, nullable = false)
    var endTm: String,

    @Column(name = "RESERVATION_TM", length = 20)
    var reservationTm: String?,

    @Column(name = "TOPIC", length = 20)
    var topic: String?,

    @Column(name = "PARTICIPANT", length = 100)
    var participant: String?,

    @Column(name = "USE_YN", length = 1, nullable = false)
    var useYn: String,
) {
    @Embeddable
    data class Key(
        @Column(name = "ROOM_CD", length = 10, nullable = false)
        var roomCd: String,

        @Column(name = "RESERVATION_DT", length = 8, nullable = false)
        var reservationDt: String,

        @Column(name = "RESERVATION_CHECKER", length = 10, nullable = false)
        var reservationChecker: String,

        @Column(name = "START_TM", length = 20, nullable = false)
        var startTm: String
    ): Serializable
}
