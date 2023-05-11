package org.meeting.reservation

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication(scanBasePackages = ["org.meeting.reservation"])
open class Application
fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}
