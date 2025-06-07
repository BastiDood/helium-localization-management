CREATE TABLE "project" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "name" TEXT NOT NULL
);

CREATE TABLE "project_locale" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "project_id" UUID NOT NULL REFERENCES "project" ("id") ON DELETE CASCADE,
    "locale" TEXT NOT NULL,
    UNIQUE ("project_id", "locale")
);

CREATE TABLE "project_key" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "project_id" UUID NOT NULL REFERENCES "project" ("id") ON DELETE CASCADE,
    "key" TEXT NOT NULL,
    UNIQUE ("project_id", "key")
);

CREATE TABLE "project_translation" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    "project_locale_id" UUID NOT NULL REFERENCES "project_locale" ("id") ON DELETE CASCADE,
    "project_key_id" UUID NOT NULL REFERENCES "project_key" ("id") ON DELETE CASCADE,
    "translation" TEXT NOT NULL,
    UNIQUE ("project_locale_id", "project_key_id")
);
