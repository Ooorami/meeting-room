package org.meeting.reservation.service

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service

@Service
class BatchService {
    @Scheduled(cron = "0 0 1 * * *")
    fun batch(){}
}
