package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Bone: ImageVector
    get() {
        if (_bone != null) {
            return _bone!!
        }
        _bone = Builder(name = "Bone", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(18.6f, 9.82f)
                curveToRelative(-0.52f, -0.21f, -1.15f, -0.25f, -1.54f, 0.15f)
                lineToRelative(-7.07f, 7.06f)
                curveToRelative(-0.39f, 0.39f, -0.36f, 1.03f, -0.15f, 1.54f)
                curveToRelative(0.12f, 0.3f, 0.16f, 0.6f, 0.16f, 0.93f)
                arcToRelative(2.5f, 2.5f, 0.0f, false, true, -5.0f, 0.0f)
                curveToRelative(0.0f, -0.26f, -0.24f, -0.5f, -0.5f, -0.5f)
                arcToRelative(2.5f, 2.5f, 0.0f, true, true, 0.96f, -4.82f)
                curveToRelative(0.5f, 0.21f, 1.14f, 0.25f, 1.53f, -0.15f)
                lineToRelative(7.07f, -7.06f)
                curveToRelative(0.39f, -0.39f, 0.36f, -1.03f, 0.15f, -1.54f)
                curveToRelative(-0.12f, -0.3f, -0.21f, -0.6f, -0.21f, -0.93f)
                arcToRelative(2.5f, 2.5f, 0.0f, false, true, 5.0f, 0.0f)
                curveToRelative(0.01f, 0.26f, 0.24f, 0.49f, 0.5f, 0.5f)
                arcToRelative(2.5f, 2.5f, 0.0f, true, true, -0.9f, 4.82f)
                close()
            }
        }
        .build()
        return _bone!!
    }

private var _bone: ImageVector? = null
