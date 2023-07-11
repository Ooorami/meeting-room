package org.meeting.reservation.model.entity

import javax.persistence.*

@Entity(name = "USER_M")
class User (
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int? = null,

    @Column(name = "USER_NAME")
    var userName: String,

    @Column(name = "USER_ID")
    var userId: String,

    @Column(name = "USER_PW")
    var userPw: String
){
}
