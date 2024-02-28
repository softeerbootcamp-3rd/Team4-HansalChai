package com.hansalchai.haul.common.utils;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBaseTime is a Querydsl query type for BaseTime
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QBaseTime extends EntityPathBase<BaseTime> {

    private static final long serialVersionUID = -2144756597L;

    public static final QBaseTime baseTime = new QBaseTime("baseTime");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final BooleanPath deleted = createBoolean("deleted");

    public final DateTimePath<java.time.LocalDateTime> deletedAt = createDateTime("deletedAt", java.time.LocalDateTime.class);

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public QBaseTime(String variable) {
        super(BaseTime.class, forVariable(variable));
    }

    public QBaseTime(Path<? extends BaseTime> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBaseTime(PathMetadata metadata) {
        super(BaseTime.class, metadata);
    }

}

