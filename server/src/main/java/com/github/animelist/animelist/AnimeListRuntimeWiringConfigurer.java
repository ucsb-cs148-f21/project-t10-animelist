package com.github.animelist.animelist;

import com.github.animelist.animelist.model.ratingsystem.ContinuousRatingSystem;
import com.github.animelist.animelist.model.ratingsystem.DiscreteRatingSystem;
import graphql.scalars.ExtendedScalars;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.TypeRuntimeWiring;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;
import org.springframework.stereotype.Component;

import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;

@Component
public class AnimeListRuntimeWiringConfigurer implements RuntimeWiringConfigurer {

    private static final TypeRuntimeWiring.Builder RATING_SYSTEM_TYPE_WIRING = newTypeWiring("RatingSystem")
            .typeResolver(env -> {
                var obj = env.getObject();

                if ((obj instanceof ContinuousRatingSystem)) {
                    return env.getSchema().getObjectType("ContinuousRatingSystem");
                } else if((obj instanceof DiscreteRatingSystem)) {
                    return env.getSchema().getObjectType("DiscreteRatingSystem");
                }

                return null;
            });

    @Override
    public void configure(RuntimeWiring.Builder builder) {
        builder.scalar(ExtendedScalars.DateTime).build();
        builder.type(RATING_SYSTEM_TYPE_WIRING);
    }
}
