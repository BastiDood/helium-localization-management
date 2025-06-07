CREATE TABLE "project" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "name" TEXT NOT NULL
);

CREATE TABLE "project_locale" (
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "project_id" UUID NOT NULL REFERENCES "project" ("id") ON DELETE CASCADE,
    "locale" TEXT NOT NULL,
    PRIMARY KEY ("project_id", "locale")
);

CREATE TABLE "project_key" (
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "project_id" UUID NOT NULL REFERENCES "project" ("id") ON DELETE CASCADE,
    "key" TEXT NOT NULL,
    PRIMARY KEY ("project_id", "key")
);

CREATE TABLE "project_translation" (
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    "project_id" UUID NOT NULL REFERENCES "project" ("id"),
    "project_locale" TEXT NOT NULL,
    "project_key" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    PRIMARY KEY ("project_id", "project_locale", "project_key"),
    FOREIGN KEY ("project_id", "project_locale") REFERENCES "project_locale" ("project_id", "locale"),
    FOREIGN KEY ("project_id", "project_key") REFERENCES "project_key" ("project_id", "key")
);
