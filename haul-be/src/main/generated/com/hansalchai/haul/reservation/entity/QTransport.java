package com.hansalchai.haul.reservation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTransport is a Querydsl query type for Transport
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTransport extends EntityPathBase<Transport> {

    private static final long serialVersionUID = 1697086419L;

    public static final QTransport transport = new QTransport("transport");

    public final com.hansalchai.haul.common.utils.QBaseTime _super = new com.hansalchai.haul.common.utils.QBaseTime(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Integer> fee = createNumber("fee", Integer.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final NumberPath<Integer> requiredTime = createNumber("requiredTime", Integer.class);

    public final NumberPath<Long> transportId = createNumber("transportId", Long.class);

    public final EnumPath<com.hansalchai.haul.reservation.constants.TransportStatus> transportStatus = createEnum("transportStatus", com.hansalchai.haul.reservation.constants.TransportStatus.class);

    public final EnumPath<com.hansalchai.haul.reservation.constants.TransportType> type = createEnum("type", com.hansalchai.haul.reservation.constants.TransportType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QTransport(String variable) {
        super(Transport.class, forVariable(variable));
    }

    public QTransport(Path<? extends Transport> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTransport(PathMetadata metadata) {
        super(Transport.class, metadata);
    }

}

