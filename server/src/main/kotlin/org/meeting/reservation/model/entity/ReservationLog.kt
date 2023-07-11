package org.meeting.reservation.model.entity

import org.meeting.reservation.model.dto.reservation.ReservationUpdateRequestDto
import org.meeting.reservation.model.enum.UseYn
import java.io.Serializable
import javax.persistence.*

@Entity(name = "RESERVATION_L")
class ReservationLog(
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int? = null,

    @Column(name = "ROOM_CD", length = 10, nullable = false)
    var roomCd: String,

    @Column(name = "RESERVATION_DT", length = 8, nullable = false)
    var reservationDt: String,

    @Column(name = "RESERVATION_CHECKER", length = 10, nullable = false)
    var reservationChecker: String,

    @Column(name = "START_TM", length = 20, nullable = false)
    var startTm: String,

    @Column(name = "END_TM", length = 20, nullable = false)
    var endTm: String,

    @Column(name = "RESERVATION_TM", length = 20)
    var reservationTm: String?,

    @Column(name = "TOPIC", length = 20)
    var topic: String?,

    @Column(name = "PARTICIPANT", length = 100)
    var participant: String?,

    @Column(name = "USE_YN", length = 1, nullable = false)
    var useYn: String = UseYn.YES.code
) {
    fun update(request: ReservationUpdateRequestDto) {
        apply {
            reservationDt = request.reservationDt ?: reservationDt
            reservationChecker = request.reservationChecker ?: reservationChecker
            startTm = request.startTm ?: startTm
            endTm = request.endTm ?: endTm
            reservationTm = request.reservationTm ?: reservationTm
            topic = request.topic ?: topic
            participant = request.participant ?: participant
        }
    }
    fun cancel() {
        useYn = UseYn.NO.code
    }
}
