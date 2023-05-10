package org.meeting.reservation.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import springfox.documentation.builders.ApiInfoBuilder
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.service.ApiInfo
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2



@Configuration
@EnableSwagger2
@EnableAutoConfiguration
@Profile("local")
open //local(개발환경)일때만 API문서 적용
class SwaggerConfig {

    @Value("\${spring.config.activate.onProfile}")
    private var API_VERSION: String = ""
    private val API_TITLE = "Meeting Room API"
    private val API_DISCRIPTION = "Meeting Room API Document"

    @Bean
    open fun api(): Docket {
        return Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .select()
            .apis(RequestHandlerSelectors.basePackage("org.meeting.reservation"))
            .paths(PathSelectors.any())
            .build()
    }

    fun apiInfo(): ApiInfo {
        return ApiInfoBuilder()
            .title(API_TITLE)
            .description(API_DISCRIPTION)
            .version(API_VERSION)
            .build()
    }
}
