package org.meeting.reservation.model.enum

enum class ApiStatusCode(val code: Int) {
    SUCCESS(0),
    FAIL(-1),
    ERROR(-900);
}
