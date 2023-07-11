package org.meeting.reservation.domain

import org.meeting.reservation.model.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<User, Int> {
    fun findByUserId(userName: String): User?
}
