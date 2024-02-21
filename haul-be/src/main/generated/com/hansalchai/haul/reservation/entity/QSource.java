package com.hansalchai.haul.reservation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSource is a Querydsl query type for Source
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSource extends EntityPathBase<Source> {

    private static final long serialVersionUID = -145214543L;

    public static final QSource source = new QSource("source");

    public final com.hansalchai.haul.common.utils.QBaseTime _super = new com.hansalchai.haul.common.utils.QBaseTime(this);

    public final StringPath address = createString("address");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final StringPath detailAddress = createString("detailAddress");

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final StringPath name = createString("name");

    public final NumberPath<Long> sourceId = createNumber("sourceId", Long.class);

    public final StringPath tel = createString("tel");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QSource(String variable) {
        super(Source.class, forVariable(variable));
    }

    public QSource(Path<? extends Source> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSource(PathMetadata metadata) {
        super(Source.class, metadata);
    }

}

