package com.hansalchai.haul.reservation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCargoOption is a Querydsl query type for CargoOption
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCargoOption extends EntityPathBase<CargoOption> {

    private static final long serialVersionUID = -1833918085L;

    public static final QCargoOption cargoOption = new QCargoOption("cargoOption");

    public final com.hansalchai.haul.common.utils.QBaseTime _super = new com.hansalchai.haul.common.utils.QBaseTime(this);

    public final NumberPath<Long> cargoOptionId = createNumber("cargoOptionId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final BooleanPath isFrozen = createBoolean("isFrozen");

    public final BooleanPath isFurniture = createBoolean("isFurniture");

    public final BooleanPath isLiftRequired = createBoolean("isLiftRequired");

    public final BooleanPath isRefrigerated = createBoolean("isRefrigerated");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QCargoOption(String variable) {
        super(CargoOption.class, forVariable(variable));
    }

    public QCargoOption(Path<? extends CargoOption> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCargoOption(PathMetadata metadata) {
        super(CargoOption.class, metadata);
    }

}

