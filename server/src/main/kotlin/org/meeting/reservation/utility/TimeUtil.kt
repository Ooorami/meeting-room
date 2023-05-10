package org.meeting.reservation.utility

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

object TimeUtil {
    fun getNowTimeHHMMSS(): String {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("HHmmss"))
    }
}
