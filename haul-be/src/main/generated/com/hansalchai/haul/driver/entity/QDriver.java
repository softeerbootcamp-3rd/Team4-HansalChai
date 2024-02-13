package com.hansalchai.haul.driver.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QDriver is a Querydsl query type for Driver
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDriver extends EntityPathBase<Driver> {

    private static final long serialVersionUID = 1176583072L;

    public static final QDriver driver = new QDriver("driver");

    public final NumberPath<Long> driverId = createNumber("driverId", Long.class);

    public QDriver(String variable) {
        super(Driver.class, forVariable(variable));
    }

    public QDriver(Path<? extends Driver> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDriver(PathMetadata metadata) {
        super(Driver.class, metadata);
    }

}

